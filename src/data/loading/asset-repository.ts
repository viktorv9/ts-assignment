import { AssetProvider } from "./asset-provider";

export class AssetRepository<T> {
  provider: AssetProvider<T>;

  constructor(provider: AssetProvider<T>) {
    this.provider = provider;
  }
  resources(): Map<string, T> {
    return this.provider.resources;
  }

  get loader () {
    return this.provider._loader;
  }

  progress(): number {
    return this.provider.progress;
  }
  load(): Promise<void> {
    return this.provider.load();
  }
  protected paths = {};

  getResource(resourceName: string) {
    return this.provider.getResource(resourceName);
  }
}
