---
name: relayout
description: review the layout of the specified panel(s) and fix them as needed.
---

Your job is to make sure the layout of the panel(s) looks perfect. Don't forget: this is a medium for phones, which demands extra clarity.

## How to check

Look directly at the .webp images themselves.

## What to check
 
**Overlaps**
- Balloons and captions don't cover anything important, like other balloons or captions, faces (hair is ok, but a 100% opacity element on the face itself is a no-go), or key action.
- Characters don't overlap themselves wrongly, like an arm awkwardly twisted behind their back.
- Nothing else overlaps in a way that looks wrong.
**Text**
- Stays inside its balloon or caption.
- Has comfortable space around it inside the balloon. Balloons also need space from everything else: even if nothing technically overlaps, things shouldn't nearly touch. At the same time, there shouldn't be an awkwardly large amount of visual padding in a container, e.g., on the right side of a left-justified text container (this could be fixed by tweaking the container size and repositioning the container as needed).
- Text is easy to read, with good contrast. No awkward line breaks, e.g., no single word alone on a paragraph's last line (this could be fixed by the container size tweak above). Text is appropriately left-justified or center-justified. 
**Clipping**
- Balloons and captions aren't cut off by the edge of the panel.
**Empty space**
- Screen real estate is at a premium. Avoid dead space; the visual weight should be roughly equal across a panel. Narrowing the shot may help.
**Details**
- Make sure details are easy to see, not just text! Again, narrowing the shot may help.
**Also**
- Balloon tails point at the right speaker.
- Balloons read in a sensible order (left to right, top to bottom).

There are exceptions to the rule, especially for stylistic reasons. Use your judgement for the final call.

If there is an issue that you've noticed and isn't in the above section, feel free to update this skill by adding it to the list (it should be its own commit).

## How to fix

Move the elements around, resize them, etc. Change the virtual camera -- "pan" up/down/left/right, "zoom" in/out.

Do not be afraid to **majorly** redo a panel from scratch, especially if it would flow better. This includes but is not limited to: repositioning the characters, resizing the entire panel (increasing the height is a good technique to get around difficult overlaps or otherwise too crowded panels), completely changing shot size/framing, splitting a panel into multiple panels, deleting/adding elements.

## Final verification

Re-render the panel to verify that it looks perfect. If not, adjust and try again.

## Batching

It could be helpful to look at multiple panels at once to make the render -> check -> re-render loop more efficient. However, you risk not placing enough emphasis on a single panel, so limit this to 3 panels at a time. 
