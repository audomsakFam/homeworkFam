export const sseService = {
  eventListen() {
    const eventSource = new EventSource("http://localhost:9000/streaming");
    eventSource.onmessage = ({ data }) => {
      console.log("New msg: ", JSON.parse(data));
    };
  },
};
