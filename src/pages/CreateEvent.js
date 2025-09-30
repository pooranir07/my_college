import { useState } from "react";

function CreateEvent() {
  const [form, setForm] = useState({ title: "", description: "", date: "", venue: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Created:", form);
    alert("Event Created Successfully!");
    setForm({ title: "", description: "", date: "", venue: "" });
  };

  return (
    <div className="card shadow p-4">
      <h2 className="mb-3">Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Event Title" value={form.title} onChange={handleChange} className="form-control mb-3" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="form-control mb-3" />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="form-control mb-3" />
        <input type="text" name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} className="form-control mb-3" />
        <button className="btn btn-success">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEvent;
