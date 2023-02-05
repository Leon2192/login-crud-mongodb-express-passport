const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { isAuthenticated } = require("../helpers/auth");

router.get("/notes/add", isAuthenticated, (req, res) => {
  res.render("notes/new-note");
});

router.post("/notes/new-note", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "please write a title" });
  }
  if (!description) {
    errors.push({ text: "please write a description" });
  }

  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({
      title,
      description,
    });
    await newNote.save();
    req.flash("success_msg", "Note added Succesfully");
    res.redirect("/notes");
  }
});

router.get("/notes", async (req, res) => {
  const notes = await Note.find().lean().sort({ date: "desc" });
  console.log(notes);
  res.render("notes/all-notes", { notes });
});

router.get("/notes/edit/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);

  res.render("notes/edit-note", { note });
});

router.put("/notes/edit-note/:id", async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Note updated succesfully");
  res.redirect("/notes");
});

router.delete("/notes/delete/:id", async (req, res) => {
  console.log(req.params.id);
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Note deleted succesfully");
  res.redirect("/notes");
});

module.exports = router;
