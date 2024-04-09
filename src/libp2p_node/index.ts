import { Libp2p, createLibp2p } from 'libp2p';
import { p2pNodeConfig } from './p2pNodeConfig';

const idTruncateLimit = 5;

export const bootLip2p = async (): Promise<Libp2p> => {
  const newLibp2pNode = await createLibp2p(p2pNodeConfig);

  
  newLibp2pNode.addEventListener('peer:connect', async evt => {
    
    const peerId = evt.detail.toString();
    console.log(`Connection established to ${peerId.slice(peerId.length - idTruncateLimit)}`, true);
  });

  newLibp2pNode.addEventListener('peer:disconnect', evt => {
    const peerId = evt.detail.toString();
    console.log(`Connection dropped from ${peerId.slice(peerId.length - idTruncateLimit)}`, true);
  });



  newLibp2pNode.addEventListener('peer:discovery', (evt) => {
    console.log('Discovered %s', evt.detail.id.toString()) // Log discovered peer
  })
  

  return newLibp2pNode;
};
