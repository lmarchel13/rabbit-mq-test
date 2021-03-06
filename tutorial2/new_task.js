const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = "task_queue";
    const msg = process.argv.slice(2).join(" ") || "LUCAS MARCHEL";

    ch.assertQueue(q, { durable: true });
    ch.sendToQueue(q, new Buffer(msg), { persistent: true });
    console.log(`[x] Sent %s"`, msg);
  });
  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
});
