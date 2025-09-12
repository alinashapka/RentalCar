import css from "./RentalForm.module.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

function RentalForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: null,
    comment: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, bookingDate: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Car successfully booked!");

    setFormData({
      name: "",
      email: "",
      bookingDate: null,
      comment: "",
    });
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <p className={css.title}>Book your car now</p>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
        <input
          className={css.input}
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          required
          autoFocus
        />
        <input
          className={css.input}
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <DatePicker
          selected={formData.bookingDate}
          onChange={handleDateChange}
          placeholderText="Booking date"
          className={css.input}
          dateFormat="yyyy-MM-dd"
        />
        <textarea
          className={css.textarea}
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
        />

        <button className={css.button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default RentalForm;
