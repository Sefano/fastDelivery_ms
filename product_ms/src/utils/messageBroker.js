import amqplib from "amqplib";
import "dotenv/config";
//channel
export const CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(process.env.AMPQ_URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(process.env.EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    throw error;
  }
};
//publish msg
export const PublishMessage = async (channel, binding_key, message) => {
  try {
    await channel.publish(
      process.env.EXCHANGE_NAME,
      binding_key,
      Buffer.from(message)
    );
    console.log("Message", binding_key);

    console.log("Message", message);
  } catch (error) {
    throw error;
  }
};

//subscribe msg
export const SubscribeMessage = async (channel, serice, binding_key) => {
  const appQueue = await channel.assertQueue("QUEUE_NAME");

  channel.bindQueue(appQueue.queue, process.env.EXCHANGE_NAME, binding_key);

  channel.consume(appQueue.queue, (data) => {
    console.log("Получены данные");
    console.log(data.content.toString());
    channel.ack(data);
  });
};
