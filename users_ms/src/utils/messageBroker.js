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
export const SubscribeMessage = async (channel, service) => {
  const usersQueue = await channel.assertQueue(process.env.USERS_QUEUE);

  channel.bindQueue(
    usersQueue.queue,
    process.env.EXCHANGE_NAME,
    process.env.USERS_BIND
  );

  channel.consume(usersQueue.queue, (data) => {
    console.log("Получены данные");
    console.log(data.content.toString());
    service.SubscribeEvents(data.content.toString());
    channel.ack(data);
  });
};
