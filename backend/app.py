from flask import Flask, request, jsonify
from flask_cors import CORS
from db_config import mysql, init_mysql

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

init_mysql(app)

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    gmail = data.get("gmail")
    password = data.get("passwrd")

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE gmail = %s", (gmail,))
    existing_user = cur.fetchone()

    if existing_user:
        return jsonify({"error": "User already exists"}), 409

    cur.execute(
        "INSERT INTO users (username, gmail, password) VALUES (%s, %s, %s)",
        (username, gmail, password)
    )
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "User registered successfully"}), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cur.fetchone()
    cur.close()

    if not user:
        return jsonify({"error": "User not found"}), 404

    stored_password = user[3]  
    if password != stored_password:
        return jsonify({"error": "Incorrect password"}), 401

    return jsonify({"message": "Login successful","userid":user[0]}), 200

@app.route("/api/useraccount",methods=["POST"])
def useraccount():
    data = request.get_json()
    userid=data.get("userid")

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE userid = %s", (userid,))

    user=cur.fetchone()
    cur.close()

    username=user[1]
    gmail=user[2]
    password=user[3]

    return jsonify({"username": username,"gmail": gmail,"password": password}), 200

@app.route("/api/changeaccount",methods=["POST"])
def changeaccountdetails():
    data = request.get_json()

    userid = data.get("userid")

    new_username = data.get("username")
    new_password = data.get("password")


    cur = mysql.connection.cursor()
    cur.execute("UPDATE users SET username = %s, password = %s WHERE userid = %s",(new_username, new_password, userid))
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "User account updated successfully"}), 200

@app.route('/api/sendlists', methods=['POST'])
def send_lists():
    data = request.get_json()
    userid = data.get('userid')


    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM lists WHERE userid = %s", (userid,))
    lists = cur.fetchall()

    final_output = []

    for list_item in lists:
        listid = list_item[0]
        listname = list_item[2]

        cur.execute("SELECT movieid,moviename FROM saved_movies WHERE listid = %s", (listid,))
        movies = cur.fetchall()


        movie_ids = [movie[0] for movie in movies]
        movie_names =  [movie[1] for movie in movies]

        final_output.append({
            "listid": listid,
            "listname": listname,
            "movieids": movie_ids,
            "movienames" : movie_names
        })

    cur.close()
    return jsonify(final_output)

@app.route('/api/addlist', methods=['POST'])
def add_list():
    data = request.get_json()  

    userid = data.get("userid")
    listname = data.get("name")

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO lists (userid, listname) VALUES (%s, %s)", (userid, listname))
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "List added successfully"}), 200

@app.route('/api/getlist',methods=['POST'])
def get_list():
    data = request.get_json()

    listid = data.get("listid")

    cur = mysql.connection.cursor()

    cur.execute("SELECT listname FROM lists WHERE listid = %s", (listid,))
    listname_result = cur.fetchone()
    listname = listname_result[0]

    cur.execute("SELECT movieid FROM saved_movies WHERE listid = %s", (listid,))
    movies = cur.fetchall()
    cur.close()

    movieids = [movie[0] for movie in movies]

    return jsonify({
    "listname": listname,
    "movieids": movieids
    }), 200



@app.route('/api/sharelist', methods=['POST'])
def share_list():
    data = request.get_json()
    listid = data.get("listid")
    username = data.get("newowner")

    conn = mysql.connection
    cursor = conn.cursor()

    cursor.execute("SELECT userid FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    if user is None:
        return jsonify({"error": "User not found"}), 404

    userid = user[0]

    cursor.execute("SELECT * FROM shared_lists WHERE listid = %s AND shared_with_userid = %s", (listid, userid))
    existing = cursor.fetchone()
    if existing:
        return jsonify({"message": "User already has access to this list"}), 200

    cursor.execute("INSERT INTO shared_lists (listid, shared_with_userid) VALUES (%s, %s)", (listid, userid))
    conn.commit()

    return jsonify({"message": "List shared successfully!"}), 200

@app.route('/api/getsharedlists', methods=['POST'])
def get_shared_lists():
    data = request.get_json()
    userid = data.get('userid')


    cur = mysql.connection.cursor()

    cur.execute("SELECT listid FROM shared_lists WHERE shared_with_userid = %s", (userid,))
    shared = cur.fetchall()

    final_output = []

    for (listid,) in shared:
        cur.execute("SELECT listname FROM lists WHERE listid = %s", (listid,))
        listname_result = cur.fetchone()
        if not listname_result:
            continue
        listname = listname_result[0]

        cur.execute("SELECT movieid, moviename FROM saved_movies WHERE listid = %s", (listid,))
        movies = cur.fetchall()

        movie_ids = [movie[0] for movie in movies]
        movie_names = [movie[1] for movie in movies]

        final_output.append({
            "listid": listid,
            "listname": listname,
            "movieids": movie_ids,
            "movienames": movie_names
        })

    cur.close()
    return jsonify(final_output)

@app.route('/api/addmovietolist', methods=['POST'])
def addmovietolist():
    data = request.get_json()

    listid = data.get("listid")
    movieid = data.get("movieid")
    moviename = data.get("moviename")

    cur = mysql.connection.cursor()

    cur.execute("INSERT INTO saved_movies (listid, movieid, moviename) VALUES (%s, %s, %s)", (listid, movieid,moviename))
    mysql.connection.commit() 
    cur.close()
    return jsonify({"message": "Movie added to the list!"}), 200



if __name__ == "__main__":
    app.run(debug=True)
