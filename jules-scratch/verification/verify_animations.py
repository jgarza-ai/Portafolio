import os
from playwright.sync_api import sync_playwright, Page, expect
import re

def verify_animations(page: Page):
    """
    This script verifies the new UI animations by navigating to the local index.html file,
    scrolling through the sections to trigger animations, and taking a screenshot.
    """
    # 1. Arrange: Get the absolute path to index.html and navigate to it.
    current_dir = os.getcwd()
    file_path = f"file://{os.path.join(current_dir, 'index.html')}"
    page.goto(file_path)

    # Wait for the page to be fully loaded
    page.wait_for_load_state("networkidle")

    # 2. Act & Assert: Scroll to each section and check for the animation class.
    sections = ["#proyectos", "#stack", "#demo", "#contacto"]
    for section_id in sections:
        section = page.locator(section_id)
        section.scroll_into_view_if_needed()
        # Wait for the animation to be applied, handle potential multiple classes
        expect(section).to_have_class(re.compile(r"is-visible"))
        page.wait_for_timeout(500) # Give it a moment to render

    # 3. Screenshot: Capture the final result for visual verification.
    # We take a full page screenshot to see all sections.
    page.screenshot(path="jules-scratch/verification/verification_animations.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})
        verify_animations(page)
        browser.close()