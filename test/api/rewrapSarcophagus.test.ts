import { ethers } from 'ethers';
import { sarcoId } from './test-data';
import { mockSafeContractCall } from './test-utils';
import { Api } from '../../src/shared/Api';
import { SarcoNetworkConfig } from '../../src/shared/types';
import { SarcoWebBundlr } from '../../src/browser/SarcoWebBundlr';

jest.spyOn(ethers, 'Contract').mockImplementation();
jest.mock('@sarcophagus-org/sarcophagus-v2-contracts');
jest.mock('../../src/browser/SarcoWebBundlr');

const signer = ethers.Wallet.createRandom({});
const api = new Api('0x0', signer, {} as SarcoNetworkConfig, {} as SarcoWebBundlr);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('rewrapSarcophagus', () => {
  test('should call safeContractCall with the correct arguments', async () => {
    const mockTransactionResponse = { hash: '0x123' } as ethers.providers.TransactionResponse;
    mockSafeContractCall.mockImplementation(() => Promise.resolve(mockTransactionResponse));

    const newResurrectionTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hours later

    const result = await api.rewrapSarcophagus(sarcoId, newResurrectionTime);

    expect(mockSafeContractCall).toHaveBeenCalledWith(
      api['embalmerFacet'],
      'rewrapSarcophagus',
      [sarcoId, newResurrectionTime],
      {}
    );
    expect(result).toBe(mockTransactionResponse);
  });
});
