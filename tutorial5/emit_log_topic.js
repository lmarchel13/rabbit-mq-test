const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, conn) => {
  conn.createChannel((err, ch) => {
    const ex = "topic_logs";
    let args = process.argv.slice(2);
    let key = args.length > 0 ? args[0] : "anonymous.info";
    const msg = process.argv.slice(1).join(" ") || "LUCAS MARCHEL";

    ch.assertExchange(ex, "topic", { durable: false });
    ch.publish(ex, key, new Buffer(msg));
    console.log(`[x] Sent %s"`, key, msg);
  });
  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
});
