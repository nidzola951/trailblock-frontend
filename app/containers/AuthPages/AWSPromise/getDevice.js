/* eslint-disable */
export default function(session) {
  return new Promise((resolve, reject) => {
    session.getDevice({
      onSuccess(result) {
        resolve(result);
      },
      onFailure(err) {
        reject(err);
      }
    });
  });
}
