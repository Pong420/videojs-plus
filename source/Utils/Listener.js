export default (events, listener, target = window) => {
  if (!Array.isArray(events)) {
    events = [events];
  }

  events.forEach(evt => target.addEventListener(evt, listener));

  return () => events.forEach(evt => target.removeEventListener(evt, listener));
};
