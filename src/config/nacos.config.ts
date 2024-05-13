import { NacosConfigClient } from 'nacos';

const sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export const NacosServer = async () => {
  console.log('Nacos dataid: ', process.env.NACOS_ENV);
  console.log('Nacos server: ', process.env.NACOS_SERVERADDR);
  console.log('Nacos namespace: ', process.env.NACOS_NAMESPACE);
  //  console.log('Nacos key: ', process.env.NACOS_IDENTITYKEY);
  //  console.log('Nacos secret: ', process.env.NACOS_IDENTITYVALUE);

  const configClient = new NacosConfigClient({
    serverAddr: process.env.NACOS_SERVERADDR,
    namespace: process.env.NACOS_NAMESPACE,
    accessKey: process.env.NACOS_IDENTITYKEY,
    secretKey: process.env.NACOS_IDENTITYVALUE,
    requestTimeout: 6000,
  });

  await sleep(2000);

  const content = await configClient.getConfig(
    process.env.NACOS_ENV,
    'DEFAULT_GROUP',
  );
  console.log('getConfig =', content);

  configClient.subscribe(
    {
      dataId: process.env.NACOS_ENV,
      group: 'DEFAULT_GROUP',
    },
    (content) => {
      const jsonData = JSON.parse(content.toString());
      for (const item in jsonData) {
        process.env[item] = jsonData[item];
      }
    },
  );

  const jsonData = JSON.parse(content.toString());
  for (const item in jsonData) {
    process.env[item] = jsonData[item];
  }

  await sleep(2000);
};
