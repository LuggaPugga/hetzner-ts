import { BaseAPI } from "./base"
import { Billing } from "./billing/billing"
import { Firewalls } from "./firewalls/firewalls"
import { FloatingIPs } from "./floating-ips/floating-ips"
import { Datacenters, Locations } from "./locations/locations"
import { Networks } from "./networks/networks"
import { SSHKeys, Certificates } from "./security"
import { Volumes } from "./volumes/volumes"
import { LoadBalancers } from "./load-balancers/load-balancers"
import { Actions } from "./actions/actions"
import { Servers } from "./servers/servers"
export class HetznerAPI extends BaseAPI {
  get actions() {
    return new Actions(this.token)
  }

  get billing() {
    return new Billing(this.token)
  }

  get certificates() {
    return new Certificates(this.token)
  }

  get datacenters() {
    return new Datacenters(this.token)
  }

  get firewalls() {
    return new Firewalls(this.token)
  }

  get floatingIps() {
    return new FloatingIPs(this.token)
  }

  get loadBalancers() {
    return new LoadBalancers(this.token)
  }

  get locations() {
    return new Locations(this.token)
  }

  get networks() {
    return new Networks(this.token)
  }

  get servers() {
    return new Servers(this.token)
  }

  get sshKeys() {
    return new SSHKeys(this.token)
  }

  get volumes() {
    return new Volumes(this.token)
  }
}
