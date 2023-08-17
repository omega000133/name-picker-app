export const getNames = () => {
    return new Promise((resolve, reject) => {
      fetch('namesData.json'
        , {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(function (myJson) {
          resolve(myJson.json());
        });
    })
  }