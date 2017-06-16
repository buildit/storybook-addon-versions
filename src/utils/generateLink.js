const generateLink = (location, current, target, hostname) => {
  if (target && location && hostname) {
    let path = '/';
    if (current) {
      path = location.pathname.replace(current, target);
    } else {
      path = `/${target}/`;
    }
    const result = `${location.protocol}//${hostname}${path}${location.search}${location.hash}`;
    return result;
  }

  return '#';
};

export default generateLink;
