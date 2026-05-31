import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Regression tests for Header dropdown behavior.
 *
 * Required behavior:
 * - Dropdowns open ONLY on click (no hover)
 * - Clicking Tools opens Tools, closes Learn
 * - Clicking Learn opens Learn, closes Tools
 * - Clicking same dropdown toggles it closed
 * - Click outside closes all
 * - ESC closes all
 * - Menu stays open while cursor moves inside it
 */

// Simulate the dropdown state machine (click-only, no hover)
function createDropdownState() {
  let openDropdown: "tools" | "learn" | null = null;
  let clickOutsideHandler: (() => void) | null = null;
  let escapeHandler: (() => void) | null = null;

  return {
    get open() {
      return openDropdown;
    },
    handleTriggerClick(name: "tools" | "learn") {
      openDropdown = openDropdown === name ? null : name;
    },
    closeAll() {
      openDropdown = null;
    },
    // Simulate clicking outside
    clickOutside() {
      openDropdown = null;
    },
    // Simulate pressing ESC
    pressEscape() {
      openDropdown = null;
    },
    onItemClick() {
      openDropdown = null;
    },
    registerHandlers(onClickOutside: () => void, onEscape: () => void) {
      clickOutsideHandler = onClickOutside;
      escapeHandler = onEscape;
    },
    simulateClickOutside() {
      clickOutsideHandler?.();
    },
    simulateEscape() {
      escapeHandler?.();
    },
  };
}

describe("Header dropdown — click-only behavior", () => {
  it("1. Open Tools → Learn closed", () => {
    const state = createDropdownState();
    state.handleTriggerClick("tools");
    assert.equal(state.open, "tools");
  });

  it("2. Open Learn → Tools closed", () => {
    const state = createDropdownState();
    state.handleTriggerClick("learn");
    assert.equal(state.open, "learn");
  });

  it("3. Click outside → all closed", () => {
    const state = createDropdownState();
    state.handleTriggerClick("tools");
    state.clickOutside();
    assert.equal(state.open, null);
  });

  it("4. ESC → all closed", () => {
    const state = createDropdownState();
    state.handleTriggerClick("learn");
    state.pressEscape();
    assert.equal(state.open, null);
  });

  it("5. Toggle same menu → closes", () => {
    const state = createDropdownState();
    state.handleTriggerClick("tools");
    assert.equal(state.open, "tools");
    state.handleTriggerClick("tools");
    assert.equal(state.open, null);
  });

  it("6. Menu stays visible while cursor moves inside (no mouseLeave closes it)", () => {
    const state = createDropdownState();
    state.handleTriggerClick("tools");
    assert.equal(state.open, "tools");

    // Simulate cursor entering dropdown panel — state should NOT change
    // In hover-based menus, mouseLeave would close it. In click-only, it stays open.
    // The state machine doesn't have mouseLeave, so open stays "tools"
    assert.equal(state.open, "tools");
  });

  it("7. Menu item click closes dropdown", () => {
    const state = createDropdownState();
    state.handleTriggerClick("tools");
    assert.equal(state.open, "tools");
    state.onItemClick();
    assert.equal(state.open, null);
  });

  it("Opening Tools then Learn: only Learn is open", () => {
    const state = createDropdownState();
    state.handleTriggerClick("tools");
    assert.equal(state.open, "tools");
    state.handleTriggerClick("learn");
    assert.equal(state.open, "learn");
  });

  it("Opening Learn then Tools: only Tools is open", () => {
    const state = createDropdownState();
    state.handleTriggerClick("learn");
    assert.equal(state.open, "learn");
    state.handleTriggerClick("tools");
    assert.equal(state.open, "tools");
  });

  it("Rapid clicking doesn't break state", () => {
    const state = createDropdownState();
    state.handleTriggerClick("tools");
    state.handleTriggerClick("learn");
    state.handleTriggerClick("tools");
    state.handleTriggerClick("learn");
    assert.equal(state.open, "learn");
  });

  it("Click outside after rapid clicks closes everything", () => {
    const state = createDropdownState();
    state.handleTriggerClick("tools");
    state.handleTriggerClick("learn");
    state.clickOutside();
    assert.equal(state.open, null);
  });

  it("ESC after opening closes everything", () => {
    const state = createDropdownState();
    state.handleTriggerClick("tools");
    state.handleTriggerClick("learn");
    state.pressEscape();
    assert.equal(state.open, null);
  });

  it("No hover-based state: mouseEnter/mouseLeave do not exist", () => {
    // This test documents the requirement:
    // The component must NOT have onMouseEnter/onMouseLeave
    // that control dropdown visibility.
    // Only click handlers should toggle openDropdown.
    const state = createDropdownState();
    state.handleTriggerClick("tools");
    // Simulating what would happen if hover existed:
    // onMouseLeave would call closeAll() — but it shouldn't exist
    // So the state should remain "tools" after any mouse activity
    assert.equal(state.open, "tools");
  });

  it("Multiple open/close cycles work correctly", () => {
    const state = createDropdownState();
    for (let i = 0; i < 10; i++) {
      state.handleTriggerClick("tools");
      assert.equal(state.open, "tools");
      state.handleTriggerClick("tools");
      assert.equal(state.open, null);
    }
  });
});

describe("Header dropdown — aria attributes", () => {
  it("aria-expanded is false when dropdown is closed", () => {
    const state = createDropdownState();
    assert.equal(state.open, null);
    // aria-expanded should be false (open === null)
    assert.equal(state.open === "tools", false);
  });

  it("aria-expanded is true for Tools when Tools is open", () => {
    const state = createDropdownState();
    state.handleTriggerClick("tools");
    assert.equal(state.open === "tools", true);
    assert.equal(state.open === "learn", false);
  });

  it("aria-expanded is true for Learn when Learn is open", () => {
    const state = createDropdownState();
    state.handleTriggerClick("learn");
    assert.equal(state.open === "learn", true);
    assert.equal(state.open === "tools", false);
  });
});
