# Video projects: house rules (apply to EVERY video project)

Set by the owner (25 Oct 2026). Follow these on every project: race films, ads, campaigns, reels.

## 1. One organised delivery folder per project, named after the project
```
<PROJECT_NAME>/
  01_APPROVED_VIDEOS/            every clip the owner approved, and nothing else
  02_NOT_APPROVED_VIDEOS/
    waiting_for_review/          made, not yet judged by the owner
    rejected/                    judged and rejected (kept for reference, never used)
  03_FULL_VIDEOS_AND_COMPARISONS/
    draft_vN_all_versions/       the newest full cut in every delivery format (see 2)
    older_drafts_and_tests/      earlier cuts, side-by-side comparisons, test reels
  04_FINAL/                      only the cut the owner signs off, in every delivery format
  05_IMAGES/
    approved/                    approved start frames / masters
    not_approved/                everything else
```
- Move a file the moment its status changes (approved, rejected, final). The folders must always match
  the project's MEDIA_MANIFEST.md.
- Media is NEVER committed (public repo, real faces, music licences). The folder is git-ignored; only
  the docs, prompts, edit lists and scripts go to GitHub.
- On the owner's PC the same folder lives under `S:\Movie  Production\Youssef\_<Project_Name>\`
  (as `_Couple_Video` does). In a cloud session, send the owner the files so nothing is lost when the
  container is recycled.

## 2. Every full cut ships in every format
For each draft and each final, export:
| Version | File suffix | Use |
|---|---|---|
| Full, landscape 16:9 (1920x1080) | `_full_16x9` | YouTube, TV, website |
| Full, vertical 9:16 (1080x1920) | `_full_9x16` | Reels, TikTok, Shorts, Stories |
| Full, square 1:1 (1080x1080) | `_full_1x1` | feed posts |
| Short ~15 s, in all three formats | `_short15s_16x9` / `_9x16` / `_1x1` | ads, teasers, stories |

The title/text is placed per format so a crop never cuts it (see
`egypt-pyramid-race/scripts/export_versions.py`, which does all of this from one untitled master).
