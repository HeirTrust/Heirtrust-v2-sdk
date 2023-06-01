import { ethers } from 'ethers';
import { Api } from '../../src/shared/Api';
import { sarcoId } from './test-data';
import { mockSafeContractCall } from './test-utils';

const signer = ethers.Wallet.createRandom({});

const api = new Api(signer.address, signer, 'subgraph/url/test');

beforeEach(() => {
  mockSafeContractCall.mockClear();
});

describe('cleanSarcophagus', () => {
  test('should call safeContractCall with the correct arguments', async () => {
    const mockTransactionResponse = { hash: '0x123' } as ethers.providers.TransactionResponse;
    mockSafeContractCall.mockImplementation(() => Promise.resolve(mockTransactionResponse));

    const result = await api.cleanSarcophagus(sarcoId);

    expect(mockSafeContractCall).toHaveBeenCalledWith(api['embalmerFacet'], 'cleanSarcophagus', [sarcoId], {});
    expect(result).toBe(mockTransactionResponse);
  });
});
