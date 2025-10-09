from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the local server
        page.goto("http://localhost:8000")

        # Scroll to the demos section by clicking the main call-to-action button
        page.get_by_role("link", name="Ver Demos Interactivos").click()

        # Wait for the swiper container to be visible
        swiper_container = page.locator('.swiper-container')
        expect(swiper_container).to_be_visible(timeout=5000)

        # Wait for the chat to initialize and show the first options
        ver_catalogo_button = page.get_by_role("button", name="Ver catálogo")
        expect(ver_catalogo_button).to_be_visible(timeout=15000) # Increased timeout

        # Take a screenshot of the initial state
        page.screenshot(path="jules-scratch/verification/01_initial_state.png")

        # Click the "Ver catálogo" button
        ver_catalogo_button.click()

        # Wait for the next set of options to appear
        electronicos_button = page.get_by_role("button", name="Electrónicos")
        expect(electronicos_button).to_be_visible(timeout=5000)

        # Verify that the correct node is highlighted in the flowchart
        # After showing new options, the flow should be at the "IA Decision" node
        active_node = page.locator('.node.active .node-content')
        expect(active_node).to_contain_text("IA Decision")

        # Take a screenshot of the interacted state
        page.screenshot(path="jules-scratch/verification/verification.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)

print("Verification script finished.")