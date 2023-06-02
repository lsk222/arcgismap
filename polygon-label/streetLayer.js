

function getSkyLayerUrl(params) {
  const streetUrls = skystreetLayer.map((item, index) => {
    const blob = new Blob([JSON.stringify(item)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    return {
      url: url,
      name: item.name
    }
  })

  return streetUrls
}