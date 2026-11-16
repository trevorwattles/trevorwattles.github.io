---
# Aaron Olsen (owner) confirmed Trevor may showcase this project (Nov 2026).
# Sources: Trevor's 189 commits in orbizon/ainotes (Jun 10 – Sep 20, 2026) and midots.ai.
# ~/Downloads/api is EnrollPro's repo and is NOT part of this project.
title: MiDOTs
order: 6
oneLiner: An AI study app that turns students' own class notes into improved notes, quizzes, flashcards, and an AI tutor.
role: Developer, 3-person team
dates: Jun – Sep 2026
stack:
  - JavaScript
  - PHP
  - CSS
  - Playwright
visibility: private
privateNote: Private company codebase
links:
  live: https://midots.ai
media: [] # TODO: calendar week view + canvas board with a note's AI chat open (demo account, made-up notes)
draft: false
---

#### What I built

- Built out the calendar: day and week views on one shared time grid, an agenda that says what repeats ("Repeats weekly on Mon, Thu"), recurring events with custom frequencies, and scheduling goals, reminders, and tasks straight from a note.
- Reworked the canvas board and document views: one floating control pill, a merged formatting toolbar, a freehand drawing tool, and per-note AI chat that can sit at the bottom, on the right, or off for just that note.
- Rebuilt Explorer search results with a table/cards toggle and a collapsible tag filter, and closed an HTML-injection hole where a note containing escaped markup came back as live HTML in its search snippet.
- Added 27 automated test files (22 unit, 5 Playwright end-to-end) covering the calendar, board gestures, and per-note AI chat.

#### The hard part

Read aloud had to highlight the sentence being spoken, but the speech layer only reported progress as a fraction of each chunk of text, so the highlight ran ahead on short chunks, lagged on long ones, and couldn't be turned back into a place in the note. I changed it to report a character offset, driven by the speech engine's own word boundaries when it sends them and re-anchored to each chunk otherwise, so drift can never outlast one chunk. Then I mapped the note's text nodes to that same string and back, which made click-to-jump possible. The highlight paints through the CSS Custom Highlight API, so it never touches the note's markup and never ends up in the undo history or the saved note.
