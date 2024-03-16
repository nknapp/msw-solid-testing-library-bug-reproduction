import {describe, expect, it} from "vitest";
import {setupServer} from "msw/node";
import {http} from "msw";


const server = setupServer(http.get("http://localhost/test", ({}) => {
    return new Response("hello")
}))

server.listen()

describe("loadValue", () => {
    it("...", async () => {
        const response = await fetch("http://localhost/test")
        expect(await response.text()).toEqual("hello")
    })
})