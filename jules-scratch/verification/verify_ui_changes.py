import os
from playwright.sync_api import sync_playwright, Page, expect

def verify_ui_changes(page: Page):
    """
    This script verifies the UI changes by navigating to the local index.html file,
    scrolling to the tech stack section, and taking a screenshot.
    """
    # 1. Arrange: Get the absolute path to index.html and navigate to it.
    current_dir = os.getcwd()
    file_path = f"file://{os.path.join(current_dir, 'index.html')}"
    page.goto(file_path)

    # Wait for the page to be fully loaded
    page.wait_for_load_state("networkidle")

    # 2. Act: Scroll to the "Stack Tecnológico" section.
    stack_section = page.locator("#stack")
    stack_section.scroll_into_view_if_needed()

    # Wait for any potential animations to finish
    page.wait_for_timeout(1000)

    # 3. Assert: Check if the Devicon icons are present
    # Using .first() to avoid strict mode violation as there might be multiple identical icons.
    expect(page.locator(".devicon-python-plain").first).to_be_visible()
    expect(page.locator(".devicon-react-original").first).to_be_visible()


    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")

# It's good practice to run the verification within a main block
# to be able to execute the script directly.
if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_ui_changes(page)
        browser.close()