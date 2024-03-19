import {render, screen} from "solid-testing-library";
import {describe, it, expect} from "vitest";

function SolidComponent() {
    return (
        <>
            <div>Test</div>
        </>
    )
}

describe("SolidComponent", () => {
    it("renders", () => {
        render(() => SolidComponent())
        expect(screen.getByText("Test")).not.toBeNull()
    })
})