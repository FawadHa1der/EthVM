package io.enkrypt.kafka.streams.processors.block

import io.enkrypt.avro.capture.BlockRecord
import io.enkrypt.avro.processing.MetricKeyRecord
import io.enkrypt.avro.processing.MetricRecord
import io.enkrypt.common.extensions.unsignedByteBuffer
import io.enkrypt.kafka.streams.models.BlockStatistic
import io.enkrypt.kafka.streams.models.BlockStatistics
import org.apache.kafka.streams.KeyValue
import java.math.BigInteger
import java.time.Instant
import java.time.ZoneOffset
import java.time.ZonedDateTime
import java.time.temporal.ChronoUnit

object BlockStatistics {

  fun forBlock(block: BlockRecord): List<KeyValue<MetricKeyRecord, MetricRecord>> {

    val (
      totalTxs,
      numSuccessfulTxs,
      numFailedTxs,
      numPendingTxs,
      totalDifficulty,
      totalGasPrice,
      avgGasPrice,
      totalTxsFees,
      avgTxsFees
    ) = BlockStatistics.forBlock(block)

    val reverse = block.getReverse()
    val intMultiplier = if (reverse) {
      -1
    } else {
      1
    }
    val bigIntMultiplier = if (reverse) {
      BigInteger.ONE.negate()
    } else {
      BigInteger.ONE
    }

    val instant = Instant.ofEpochSecond(block.getHeader().getTimestamp())
    val dateTime = ZonedDateTime.ofInstant(instant, ZoneOffset.UTC)
    val startOfDayEpoch = dateTime.truncatedTo(ChronoUnit.DAYS).toInstant().epochSecond

    val keyBuilder = MetricKeyRecord
      .newBuilder()
      .setDate(startOfDayEpoch)

    return listOf(
      KeyValue(
        keyBuilder.setName(BlockStatistic.TotalTxs.name).build(),
        MetricRecord.newBuilder().`setInt$`(totalTxs * intMultiplier).build()
      ),
      KeyValue(
        keyBuilder.setName(BlockStatistic.NumSuccessfulTxs.name).build(),
        MetricRecord.newBuilder().`setInt$`(numSuccessfulTxs * intMultiplier).build()
      ),
      KeyValue(
        keyBuilder.setName(BlockStatistic.NumFailedTxs.name).build(),
        MetricRecord.newBuilder().`setInt$`(numFailedTxs * intMultiplier).build()
      ),
      KeyValue(
        keyBuilder.setName(BlockStatistic.NumPendingTxs.name).build(),
        MetricRecord.newBuilder().`setInt$`(numPendingTxs * intMultiplier).build()
      ),
      KeyValue(
        keyBuilder.setName(BlockStatistic.TotalDifficulty.name).build(),
        MetricRecord.newBuilder().setBigInteger(totalDifficulty.times(bigIntMultiplier).unsignedByteBuffer()).build()
      ),
      KeyValue(
        keyBuilder.setName(BlockStatistic.TotalGasPrice.name).build(),
        MetricRecord.newBuilder().setBigInteger(totalGasPrice.times(bigIntMultiplier).unsignedByteBuffer()).build()
      ),
      KeyValue(
        keyBuilder.setName(BlockStatistic.AvgGasPrice.name).build(),
        MetricRecord.newBuilder().setBigInteger(avgGasPrice.times(bigIntMultiplier).unsignedByteBuffer()).build()
      ),
      KeyValue(
        keyBuilder.setName(BlockStatistic.TotalTxsFees.name).build(),
        MetricRecord.newBuilder().setBigInteger(totalTxsFees.times(bigIntMultiplier).unsignedByteBuffer()).build()
      ),
      KeyValue(
        keyBuilder.setName(BlockStatistic.AvgTxsFees.name).build(),
        MetricRecord.newBuilder().setBigInteger(avgTxsFees.times(bigIntMultiplier).unsignedByteBuffer()).build()
      )
    )
  }
}