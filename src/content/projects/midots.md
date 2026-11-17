---
# Aaron Olsen (owner) confirmed Trevor may showcase this project (Nov 2026).
# Sources: Trevor's 189 commits in orbizon/ainotes (Jun 10 – Sep 20, 2026), midots.ai's
# public product page, and Trevor's screenshots. ~/Downloads/api is EnrollPro's repo and is
# NOT part of this project.
title: MiDOTs
order: 2
oneLiner: An AI study app built around students' own class notes. The AI fills out rough notes, turns them into quizzes and flashcards, and runs study sessions as Ace, a tutor that quizzes you instead of doing your work.
role: Developer
dates: Jun – Sep 2026
stack:
  - JavaScript
  - PHP
  - CSS
  - OpenAI API
  - Playwright
visibility: private
privateNote: Private company codebase
links:
  live: https://midots.ai
mediaLayout: column
media:
  - type: image
    src: study-home.png
    alt: The Study home page with a prompt to turn notes into flashcards and quizzes, a row of quick-learn question cards, and the student's study spaces.
    caption: Study home, where notes become flashcards and quizzes
  - type: image
    src: ace-tutor-session.png
    alt: An Ace tutor session for a history course, where the AI introduces what the test covers and asks a multiple-choice question about Reconstruction, with a chat box to message Ace below.
    caption: Ace, the AI tutor, quizzing from a student's history notes
draft: false
---

#### Notable work

- Built AI features that run through the notes: semantic search over notes using embeddings with a keyword fallback, vision support so the AI can read photos and hand drawings, and chat tools that let the AI edit a note or put it on the calendar with the event linked back to the note.
- Made AI edits dependable: an edit the AI confirms in chat always lands in the note, later saves can't overwrite it, and the change history stays bounded when the AI rewrites a large note. Each note can also carry its own AI chat, placed at the bottom, on the right, or turned off.
- Built out the calendar: day and week views on one shared time grid, an agenda that says what repeats ("Repeats weekly on Mon, Thu"), recurring events with custom frequencies, and scheduling goals, reminders, and tasks straight from a note.
- Reworked the canvas board, document view, and Explorer search, closed an HTML-injection hole in search snippets, and added 27 automated test files (22 unit, 5 Playwright end-to-end).

#### The hard part

Read aloud had to highlight the sentence being spoken, but the speech layer only reported progress as a fraction of each chunk of text, so the highlight ran ahead on short chunks, lagged on long ones, and couldn't be turned back into a place in the note. I changed it to report a character offset, driven by the speech engine's own word boundaries when it sends them and re-anchored to each chunk otherwise, so drift can never outlast one chunk. Then I mapped the note's text nodes to that same string and back, which made click-to-jump possible. The highlight paints through the CSS Custom Highlight API, so it never touches the note's markup and never ends up in the undo history or the saved note.
