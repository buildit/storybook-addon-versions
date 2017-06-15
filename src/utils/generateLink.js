const generateLink = (current, target, hostname) => {
  if (target && window && window.parent) {
    const url = window.parent.location;
    let path = '/';
    if (current) {
      path = url.pathname.replace(current, target);
    } else {
      path = `/${target}/`;
    }
    const result = `${url.protocol}//${hostname}${path}${url.search}${url.hash}`;
    return result;
  }

  return '#';
};

export default generateLink;
