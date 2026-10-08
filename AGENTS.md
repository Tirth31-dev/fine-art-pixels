<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Project architecture

- Keep the public portfolio as a single scrolling home route because its section-to-section editorial composition is the core experience.
- Manage Lenis in a client-initialized scrolling hook with teardown, reduced-motion opt-out, native touch scrolling, and dialog pause handling to preserve accessibility and nested scrolling.
