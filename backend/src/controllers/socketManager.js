// // import { Server } from "socket.io";

// // let connections = {};
// // let messages = {};
// // let timeOnline = {};

// // export const connectToSocket = (server) => {
// //   const io = new Server(server, {
// //     cors: {
// //       origin: "*",
// //       methods: ["GET", "POST"],
// //       allowedHeaders: ["*"],
// //       credentials: true,
// //     },
// //   });

// //   io.on("connection", (socket) => {
// //     console.log("SOMETHING CONNECTED");

// //     socket.on("join-call", (path) => {
// //       if (connections[path] === undefined) {
// //         connections[path] = [];
// //       }
// //       connections[path].push(socket.id);
// //       timeOnline[socket.id] = new Date();

// //       for (let a = 0; a < connections[path].length; a++) {
// //         io.to(connections[path][a]).emit(
// //           "user-joined",
// //           socket.id,
// //           connections[path]
// //         );
// //       }
// //       if (messages[path] !== undefined) {
// //         for (let a = 0; a < messages[path].length; a++) {
// //           io.to(socket.id).emit(
// //             "chat-message",
// //             messages[path][a]["data"],
// //             messages[path][a]["sender"],
// //             messages[path][a]["socket-id-sender"]
// //           );
// //         }
// //       }
// //     });

// //     socket.on("signal", (toId, message) => {
// //       io.to(toId).emit("signal", socket.id, message);
// //     });

// //     socket.on("chat-message", (data, sender) => {
// //       const [matchingRoom, found] = Object.entries(connections).reduce(
// //         ([room, isFound], [roomKey, roomValue]) => {
// //           if (!isFound && roomValue.includes(socket.id)) {
// //             return [roomKey, true];
// //           }
// //           return [room, isFound];
// //         },
// //         ["", false]
// //       );

// //       if (found) {
// //         if (messages[matchingRoom] === undefined) {
// //           messages[matchingRoom] = [];
// //         }

// //         messages[matchingRoom].push({
// //           sender: sender,
// //           data: data,
// //           "socket-id-sender": socket.id,
// //         });
// //         console.log("message", matchingRoom, ":", sender, data);

// //         connections[matchingRoom].forEach((elem) => {
// //           io.to(elem).emit("chat-message", data, sender, socket.id);
// //         });
// //       }
// //     });

// //     socket.on("disconnect", () => {
// //       var diffTime = Math.abs(timeOnline[socket.id] - new Date());
// //       var key;

// //       for (const [k, v] of Object.entries(connections)) {
// //         for (let a = 0; a < v.length; ++a) {
// //           if (v[a] === socket.id) {
// //             key = k;

// //             for (let a = 0; a < connections[key].length; ++a) {
// //               io.to(connections[key][a]).emit("user-left", socket.id);
// //             }

// //             var index = connections[key].indexOf(socket.id);
// //             connections[key].splice(index, 1);

// //             if (connections[key].length === 0) {
// //               delete connections[key];
// //             }
// //           }
// //         }
// //       }
// //     });
// //   });

// //   return io;
// // };

// import { Server } from "socket.io";

// let connections = {};
// let messages = {};
// let timeOnline = {};

// export const connectToSocket = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["*"],
//       credentials: true,
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("SOMETHING CONNECTED");

//     socket.on("join-call", (path) => {
//       if (connections[path] === undefined) {
//         connections[path] = [];
//       }
//       connections[path].push(socket.id);

//       timeOnline[socket.id] = new Date();

//       // connections[path].forEach(elem => {
//       //     io.to(elem)
//       // })

//       for (let a = 0; a < connections[path].length; a++) {
//         io.to(connections[path][a]).emit(
//           "user-joined",
//           socket.id,
//           connections[path]
//         );
//       }

//       if (messages[path] !== undefined) {
//         for (let a = 0; a < messages[path].length; ++a) {
//           io.to(socket.id).emit(
//             "chat-message",
//             messages[path][a]["data"],
//             messages[path][a]["sender"],
//             messages[path][a]["socket-id-sender"]
//           );
//         }
//       }
//     });

//     socket.on("signal", (toId, message) => {
//       io.to(toId).emit("signal", socket.id, message);
//     });

//     socket.on("chat-message", (data, sender) => {
//       const [matchingRoom, found] = Object.entries(connections).reduce(
//         ([room, isFound], [roomKey, roomValue]) => {
//           if (!isFound && roomValue.includes(socket.id)) {
//             return [roomKey, true];
//           }

//           return [room, isFound];
//         },
//         ["", false]
//       );

//       if (found === true) {
//         if (messages[matchingRoom] === undefined) {
//           messages[matchingRoom] = [];
//         }

//         messages[matchingRoom].push({
//           sender: sender,
//           data: data,
//           "socket-id-sender": socket.id,
//         });
//         console.log("message", matchingRoom, ":", sender, data);

//         connections[matchingRoom].forEach((elem) => {
//           io.to(elem).emit("chat-message", data, sender, socket.id);
//         });
//       }
//     });

//     socket.on("disconnect", () => {
//       var diffTime = Math.abs(timeOnline[socket.id] - new Date());

//       var key;

//       for (const [k, v] of JSON.parse(
//         JSON.stringify(Object.entries(connections))
//       )) {
//         for (let a = 0; a < v.length; ++a) {
//           if (v[a] === socket.id) {
//             key = k;

//             for (let a = 0; a < connections[key].length; ++a) {
//               io.to(connections[key][a]).emit("user-left", socket.id);
//             }

//             var index = connections[key].indexOf(socket.id);

//             connections[key].splice(index, 1);

//             if (connections[key].length === 0) {
//               delete connections[key];
//             }
//           }
//         }
//       }
//     });
//   });

//   return io;
// };

import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    socket.on("join-call", (path) => {
      if (!connections[path]) {
        connections[path] = [];
      }
      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      // Notify other users in the call about the new user
      connections[path].forEach((id) => {
        io.to(id).emit("user-joined", socket.id, connections[path]);
      });

      // Send existing chat messages to the new user
      if (messages[path]) {
        messages[path].forEach(
          ({ data, sender, "socket-id-sender": senderId }) => {
            io.to(socket.id).emit("chat-message", data, sender, senderId);
          }
        );
      }
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      const matchingRoom = Object.keys(connections).find((roomKey) =>
        connections[roomKey].includes(socket.id)
      );

      if (matchingRoom) {
        if (!messages[matchingRoom]) {
          messages[matchingRoom] = [];
        }

        messages[matchingRoom].push({
          sender,
          data,
          "socket-id-sender": socket.id,
        });

        console.log("message", matchingRoom, ":", sender, data);

        connections[matchingRoom].forEach((id) => {
          io.to(id).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    socket.on("disconnect", () => {
      const disconnectTime = Math.abs(timeOnline[socket.id] - new Date());
      delete timeOnline[socket.id];

      Object.keys(connections).forEach((roomKey) => {
        const index = connections[roomKey].indexOf(socket.id);
        if (index !== -1) {
          connections[roomKey].splice(index, 1);
          connections[roomKey].forEach((id) => {
            io.to(id).emit("user-left", socket.id);
          });

          if (connections[roomKey].length === 0) {
            delete connections[roomKey];
          }
        }
      });

      console.log(
        `Client disconnected: ${socket.id} (Online for ${disconnectTime}ms)`
      );
    });
  });

  return io;
};
