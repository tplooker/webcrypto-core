import { ProviderKeyUsages } from "../types";
import { EllipticProvider } from "./base";

export abstract class EddsaProvider extends EllipticProvider {

  public readonly name = "EDDSA";

  public readonly hashAlgorithms = ["SHA-512"];

  public usages: ProviderKeyUsages = {
    privateKey: ["sign"],
    publicKey: ["verify"],
  };

  public namedCurves = ["Curve25519"];

  public checkAlgorithmParams(algorithm: EddsaParams) {
    this.checkRequiredProperty(algorithm, "hash");
    this.checkHashAlgorithm(algorithm.hash as Algorithm, this.hashAlgorithms);
  }

  public abstract onSign(algorithm: EddsaParams, key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer>;
  public abstract onVerify(algorithm: EddsaParams, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer): Promise<boolean>;

}

export interface EddsaParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
}
