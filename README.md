# Box Blast

A team review game in the style of the old PowerPoint "bomb" boards. A team answers a question; if they get it right they pick a numbered box. Boxes hide points, multipliers, swaps, steals, shields and bombs. Plays with 2 to 5 teams on one projector.

**Play:** https://jtrossa.github.io/review-game/
**Link straight to a topic:** add `#pack-id`, for example https://jtrossa.github.io/review-game/#gss-u2

## Running a game
1. Choose the question pack and topics, teams and names, board size, box mix (Calm, Classic or Chaos), timer, steal rule and sound. Press **Start game**.
2. Read the **How to play** screen with the class, then press **Let's play!** (The **Rules** button brings it back.)
3. **Show question** (Space). Answer with A to D or a click. For open questions, show the model answer, then mark **Correct** or **Not quite**.
4. Right answer: **Pick a box**. Wrong answer: the next team can steal.
5. The game ends when the board is empty, or press **End game**.

**Undo** (U) steps back through any action. **Skip question** swaps a question. The game autosaves; reopen the page and press **Resume**.

## Offline
Download `dist/BoxBlast_AllPacks.html` and open it in any browser. Every pack is built in.

## Adding a topic
Add a pack file to `packs/`, list it in `packs/manifest.js`, run `node tools/check_packs.js`, then `python3 build.py`. The format and quality rules are in `CLAUDE.md`. Without editing the repo, **Load pack (.json)** on the setup screen plays a pack straight away.

Wellspring International Bilingual Schools · Social Sciences
