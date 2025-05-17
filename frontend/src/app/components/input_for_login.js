export default function Input({className, label, id, name, type = "text" }) {
    return (
      <div>
        <label htmlFor={id} className="text-[30px] text-black">
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          className={`${className} block bg-white border rounded-[0.5rem] p-[5px] w-fill`}
        />
      </div>
    );
  }
