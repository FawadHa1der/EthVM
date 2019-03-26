import { EthvmApi, EthvmApolloApi } from '@app/core/api'
import { Block, PendingTx, SimpleBlock, SimpleTx, Tx, Uncle } from '@app/core/models'
import {
  AddressBalance,
  AddressMetadata,
  BlockMetrics,
  Contract,
  ProcessingMetadata,
  Quote,
  Statistic,
  Token,
  TokenExchangeRate,
  TokenTransfer
} from 'ethvm-common'

// TODO:
//    1) Map errors
//    2) Migrate rest of the calls
export class EthvmMigrationApi implements EthvmApi {
  constructor(private readonly apolloApi: EthvmApolloApi) {}

  // ------------------------------------------------------------------------------------
  // Address
  // ------------------------------------------------------------------------------------

  public getAddressBalance(address: string): Promise<AddressBalance> {
    return this.apolloApi.getAddressBalance(address)
  }

  public getAddressMetadata(address: string): Promise<AddressMetadata> {
    return this.apolloApi.getAddressMetadata(address)
  }

  public getAddressAllTokensOwned(address: string): Promise<Token[]> {
    return this.apolloApi.getAddressAllTokensOwned(address)
  }

  public getAddressAmountTokensOwned(address: string): Promise<number> {
    return this.apolloApi.getAddressAmountTokensOwned(address)
  }

  public getAddressTokenTransfers(address: string, limit: number, page: number): Promise<TokenTransfer[]> {
    return this.apolloApi.getAddressTokenTransfers(address, limit, page)
  }

  public getAddressTokenTransfersByHolder(address: string, holder: string, filter: string, limit: number, page: number): Promise<TokenTransfer[]> {
    return this.apolloApi.getAddressTokenTransfersByHolder(address, holder, filter, limit, page)
  }

  // ------------------------------------------------------------------------------------
  // Blocks
  // ------------------------------------------------------------------------------------

  public getBlock(hash: string): Promise<Block> {
    return this.apolloApi.getBlock(hash)
  }

  public getBlocks(limit: number, page: number, fromBlock: number): Promise<SimpleBlock[]> {
    return this.apolloApi.getBlocks(limit, page, fromBlock)
  }

  public getBlockByNumber(no: number): Promise<Block> {
    return this.apolloApi.getBlockByNumber(no)
  }

  public getBlocksMinedOfAddress(address: string, limit: number, page: number): Promise<SimpleBlock[]> {
    return this.apolloApi.getBlocksMinedOfAddress(address, limit, page)
  }

  public getTotalNumberOfBlocks(): Promise<number> {
    return this.apolloApi.getTotalNumberOfBlocks()
  }

  // ------------------------------------------------------------------------------------
  // Blocks Metrics
  // ------------------------------------------------------------------------------------

  public getBlockMetric(hash: string): Promise<BlockMetrics> {
    return this.apolloApi.getBlockMetric(hash)
  }

  public getBlockMetrics(limit: number, page: number): Promise<BlockMetrics[]> {
    return this.apolloApi.getBlockMetrics(limit, page)
  }

  // ------------------------------------------------------------------------------------
  // Contracts
  // ------------------------------------------------------------------------------------

  public getContract(address: string): Promise<Contract> {
    return this.apolloApi.getContract(address)
  }

  public getContractsCreatedBy(address: string, limit: number, page: number): Promise<Contract[]> {
    return this.apolloApi.getContractsCreatedBy(address, limit, page)
  }

  // ------------------------------------------------------------------------------------
  // Exchanges
  // ------------------------------------------------------------------------------------

  public getExchangeRateQuote(symbol: string, to: string): Promise<Quote> {
    return this.apolloApi.getExchangeRateQuote(symbol, to)
  }

  public getTokenExchangeRates(filter: string, limit: number, page: number): Promise<TokenExchangeRate[]> {
    return this.apolloApi.getTokenExchangeRates(filter, limit, page)
  }

  public getTotalNumberOfTokenExchangeRates(): Promise<number> {
    return this.apolloApi.getTotalNumberOfTokenExchangeRates()
  }

  public getTokenExchangeRateBySymbol(symbol: string): Promise<TokenExchangeRate> {
    return this.apolloApi.getTokenExchangeRateBySymbol(symbol)
  }

  public getTokenExchangeRateByAddress(address: string): Promise<TokenExchangeRate> {
    return this.apolloApi.getTokenExchangeRateByAddress(address)
  }

  public getTokenHistory(address: string): Promise<any> {
    return this.apolloApi.getTokenHistory(address)
  }

  public getTopTokenHolders(address: string): Promise<any> {
    return this.apolloApi.getTopTokenHolders(address)
  }

  public getHolderDetails(address: string, holderAddress: string): Promise<any> {
    return this.apolloApi.getHolderDetails(address, holderAddress)
  }

  public getHolderTransfers(address: string, holderAddress: string): Promise<any> {
    return this.apolloApi.getHolderTransfers(address, holderAddress)
  }

  // ------------------------------------------------------------------------------------
  // Pending Txs (NOTE: Not needed to port yet)
  // ------------------------------------------------------------------------------------

  public getPendingTxs(limit: number, page: number): Promise<PendingTx[]> {
    throw new Error('Method not implemented.')
  }

  public getPendingTxsOfAddress(address: string, filter: string, limit: number, page: number): Promise<PendingTx[]> {
    throw new Error('Method not implemented.')
  }

  public getNumberOfPendingTxsOfAddress(address: string): Promise<number> {
    throw new Error('Method not implemented.')
  }

  public getTotalNumberOfPendingTxs(): Promise<number> {
    throw new Error('Method not implemented.')
  }

  // ------------------------------------------------------------------------------------
  // Txs
  // ------------------------------------------------------------------------------------

  public getTx(hash: string): Promise<Tx> {
    return this.apolloApi.getTx(hash)
  }

  public getTxs(limit: number, order: string, fromBlock: number): Promise<SimpleTx[]> {
    return this.apolloApi.getTxs(limit, order, fromBlock)
  }

  public getTxsOfAddress(hash: string, filter: string, limit: number, page: number): Promise<SimpleTx[]> {
    return this.apolloApi.getTxsOfAddress(hash, filter, limit, page)
  }

  public getTotalNumberOfTxs(): Promise<number> {
    return this.apolloApi.getTotalNumberOfTxs()
  }

  // ------------------------------------------------------------------------------------
  // Uncles
  // ------------------------------------------------------------------------------------

  public getUncle(hash: string): Promise<Uncle> {
    return this.apolloApi.getUncle(hash)
  }

  public getUncles(limit: number, page: number, fromUncle: number): Promise<Uncle[]> {
    return this.apolloApi.getUncles(limit, page, fromUncle)
  }

  public getTotalNumberOfUncles(): Promise<number> {
    return this.apolloApi.getTotalNumberOfUncles()
  }

  // ------------------------------------------------------------------------------------
  // Statistics
  // ------------------------------------------------------------------------------------

  public getAverageBlockTimeStats(duration: string): Promise<Statistic[]> {
    return this.apolloApi.getAverageBlockTimeStats(duration)
  }

  public getAverageDifficultyStats(duration: string): Promise<Statistic[]> {
    return this.apolloApi.getAverageDifficultyStats(duration)
  }

  public getAverageGasLimitStats(duration: string): Promise<Statistic[]> {
    return this.apolloApi.getAverageGasLimitStats(duration)
  }

  public getAverageGasPriceStats(duration: string): Promise<Statistic[]> {
    return this.apolloApi.getAverageGasPriceStats(duration)
  }

  public getAverageHashRateStats(duration: string): Promise<Statistic[]> {
    return this.apolloApi.getAverageHashRateStats(duration)
  }

  public getAverageMinerRewardsStats(duration: string): Promise<Statistic[]> {
    return this.apolloApi.getAverageMinerRewardsStats(duration)
  }

  public getAverageTxFeeStats(duration: string): Promise<Statistic[]> {
    return this.apolloApi.getAverageTxFeeStats(duration)
  }

  public getFailedTxStats(duration: string): Promise<Statistic[]> {
    return this.apolloApi.getFailedTxStats(duration)
  }

  public getSuccessfulTxStats(duration: string): Promise<Statistic[]> {
    return this.apolloApi.getSuccessfulTxStats(duration)
  }

  // ------------------------------------------------------------------------------------
  // Search
  // ------------------------------------------------------------------------------------

  public search(input: string): Promise<any> {
    return this.apolloApi.search(input)
  }

  // ------------------------------------------------------------------------------------
  // Processing Metadata
  // ------------------------------------------------------------------------------------

  public getProcessingMetadata(id: string): Promise<ProcessingMetadata> {
    return this.apolloApi.getProcessingMetadata(id)
  }
}
