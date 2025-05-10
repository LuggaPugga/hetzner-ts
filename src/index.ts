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
  actions() {
    return new Actions(this.token)
  }

  billing() {
    return new Billing(this.token)
  }

  certificates() {
    return new Certificates(this.token)
  }

  datacenters() {
    return new Datacenters(this.token)
  }

  firewalls() {
    return new Firewalls(this.token)
  }

  floatingIps() {
    return new FloatingIPs(this.token)
  }

  loadBalancers() {
    return new LoadBalancers(this.token)
  }

  locations() {
    return new Locations(this.token)
  }

  networks() {
    return new Networks(this.token)
  }

  servers() {
    return new Servers(this.token)
  }

  sshKeys() {
    return new SSHKeys(this.token)
  }

  volumes() {
    return new Volumes(this.token)
  }
}
