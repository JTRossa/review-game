# Box Blast (review-game)

Team review game for James Teague's classes at Wellspring Saigon, modeled on the old PowerPoint "bomb" boards. Live at **https://jtrossa.github.io/review-game/** (GitHub Pages, `main` branch, root).

The engine is finished. **Almost all work in this repo is adding question packs.** Don't change `index.html` unless James asks for an engine change.

## Layout
- `index.html`: the whole engine (HTML, CSS and JS). Loads `packs/manifest.js`.
- `packs/manifest.js`: list of pack files, in menu order.
- `packs/*.js`: one question pack per file.
- `tools/check_packs.js`: validator. Run it before every commit.
- `build.py`: makes single-file offline copies in `dist/`.
- `dist/BoxBlast_AllPacks.html`: offline copy with every pack. Rebuild it on every pack change.

## Adding a pack (the routine)
1. **Read the source material** James gives you: lesson decks, task sheets, review sheets, Wayground imports, textbook, unit test. Use only facts from his materials; don't bring in outside facts or figures.
2. **Write `packs/<subject>-<unit>-<slug>.js`**, for example `gss-u3-decolonization.js` or `apwh-u4-maritime-empires.js`:
   ```js
   window.BOX_BLAST_PACKS = window.BOX_BLAST_PACKS || [];
   window.BOX_BLAST_PACKS.push({
     id: "gss-u3",                       // short, unique; also the share link: /review-game/#gss-u3
     subject: "GSS (Grade 9)",           // menu group; reuse the exact existing subject names
     title: "GSS Unit 3: The Fall of the British Empire",
     subtitle: "Grade 9 · Unit test review",
     questions: [
       { topic: "Key terms", q: "Question?", o: ["A", "B", "C", "D"], a: 2, e: "Why C is right, in one or two sentences." },
       { topic: "Exam skills", type: "open", q: "Open question the teacher marks", model: "Model answer shown on reveal." }
     ]
   });
   ```
   - `a` is the index of the correct option (0 to 3). The engine **shuffles options every time**, so write the options in any order. Add `keepOrder: true` only when the order matters (for example "Both A and B").
   - Subject names in use: `GSS (Grade 9)`. Planned: `AP World History`, `History (Grade 10)`, `Maths (Grade 12)`.
3. **Quality rules**
   - 50 to 80 questions, in 5 to 9 topics, so a 30-box board with steals doesn't run out.
   - About a third should be **skills** questions in James's methods for that subject. For GSS: PEE short answers, RAVEN source evaluation (Unit 2 uses RAVEN only; history units use HIPP and RAVEN), command words, describing trends, choosing evidence from an unseen case study, "to what extent" judgments. For AP World: HIPP, contextualization, causation and comparison, thesis choice.
   - 5 to 10 percent open questions (`type: "open"`), with a model answer written at the level of a strong student in that class.
   - One clearly correct option and three plausible distractors. No trick wording, and no "all/none of the above".
   - Pitch to the class. GSS Grade 9 works like a low GCSE class: short sentences, everyday words, one idea per question.
   - Use American English and no em dashes.
   - **Never copy items from a real unit test or semester exam.** Check the test if James supplies it, and change the numbers and wording of anything close.
   - No student names, and no marks.
4. Add the file name to `packs/manifest.js`.
5. `node tools/check_packs.js`: it must pass.
6. `python3 build.py` to rebuild `dist/BoxBlast_AllPacks.html`. For a classroom copy of one pack: `python3 build.py <pack>.js <SUBJ>_U<n>_BoxBlast_ReviewGame.html`.
7. Commit and push to `main`. Pages updates in about a minute. Give James the link `https://jtrossa.github.io/review-game/#<id>`.
8. If James's OneDrive is connected, save the single-pack classroom copy following his file-organiser routing. That's normally `My classes 26-27/<Class>/<Unit>/...` and `Social Science and Electives SY 26-27/3. Materials/<Subject>/<Unit>/...`.

## Engine facts (for answering James's questions)
- 2 to 5 teams; boards of 12, 16, 20, 25 or 30; box mixes Calm, Classic or Chaos; timer; steal on wrong answer; synthesized sound; undo (U); skip question; autosave and resume in the browser; How to play screen for students; teacher guide on the setup page; load a .json pack from the setup screen.
- Boxes: +50 to +400, +500 and +1000 jackpots, ×2/×3/×5, −100/−300/−500, half, bomb, nuke, top cut, swap, steal 300, gift 200, Robin Hood, party, double or nothing, shield, extra turn, mystery. Boards are dealt randomly, with one big win and one disaster guaranteed. Scores never go below 0.
- Look: Wellspring navy, with orange, gold and teal accents; Mulish titles and Calibri body text.
