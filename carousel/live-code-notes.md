1. Next, previous
2. play/pause (setTimeout, make mistakes, don't clean up)
3. useProgress (so we can see the mistakes)
4. fix mistakes
5. dependencies for useEffect
6. reducer
7. slide nav
8. take focus

- next / previous
- auto play (don't clean up)
- add play/pause (add guard in useEffect)
  - note that it doesn't stop the last timeout
  - clean up effect
- add progress bar
  - add props
  - add useProgress
  - note it only works once
  - add a key, effect cleans up
- review useProgress
  - point out args that cause it to reset
- stop playing on back/forward
