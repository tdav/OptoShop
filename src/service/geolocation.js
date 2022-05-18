export default class {
  static getPreciseLocation() {
    var geo = navigator.geolocation;
    return new Promise(function(resolve, reject) {
      geo.watchPosition(
        function(position) {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        function(error) {
          switch (error.code) {
            case 0:
              reject('unknown error');
              break;

            case 1:
              reject('permission denied');
              break;

            case 2:
              reject(
                'position unavailable (error response from location provider)'
              );
              break;

            case 3:
              reject('timed out');
              break;

            default:
              reject(error.code);
              break;
          }
        }
      );
    });
  }
}
