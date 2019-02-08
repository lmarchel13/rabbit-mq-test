const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, conn) => {
  conn.createChannel((err, ch) => {
    const ex = "direct_logs";
    let args = process.argv.slice(2);
    const msg = process.argv.slice(1).join(" ") || "LUCAS MARCHEL";
    let severity = args.length > 0 ? args[0] : "info";

    ch.assertExchange(ex, "direct", { durable: false });
    ch.publish(ex, severity, new Buffer(msg));
    console.log(`[x] Sent %s"`, severity, msg);
  });
  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
});
