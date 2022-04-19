import { BigInt } from "@graphprotocol/graph-ts"
import { Deposit,EmergencyWithdraw,Withdraw } from "../generated/EvermoonFarmChapel/EvermoonFarmChapel"
import { user,tvl } from "../generated/schema"

export function handleDeposit(event: Deposit): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = user.load(event.params.to.toHexString())
  if (entity===null)
    entity = new user(event.params.to.toHexString())
  entity.pid = event.params.pid
  const storeamount = entity.amount
  const amount =event.params.amount
  entity.amount = storeamount+amount
  entity.save()
  let total = tvl.load("1")
  if (total===null)
  total = new tvl("1")
  total.amount += event.params.amount
  total.save()
}
export function handleEmergencyWithdraw(event: EmergencyWithdraw): void {
  let entity = user.load(event.params.user.toHexString())
  if (entity===null)
    entity = new user(event.params.user.toHexString())
  entity.pid = event.params.pid
  entity.amount = -(event.params.amount)+entity.amount
  entity.save()
  let total = tvl.load("1")
  if (total===null)
  total = new tvl("1")
  total.amount = -(event.params.amount)+total.amount
  total.save()
}

export function handleWithdraw(event: Withdraw): void {
  let entity = user.load(event.params.user.toHexString())
  if (entity===null)
    entity = new user(event.params.user.toHexString())
  entity.pid = event.params.pid
  entity.amount = -(event.params.amount)+entity.amount
  entity.save()
  let total = tvl.load("1")
  if (total===null)
  total = new tvl("1")
  total.amount = -(event.params.amount)+total.amount
  total.save()
}
