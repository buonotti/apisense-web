export class ChunkFetcher<T> {
    private readonly _data: T[] = [];

    static CHUNK_SIZE = 50;

    private chunkIndex = 0;

    private constructor(data: T[]) {
        this._data = data;
    }

    static new<T>(data: T[]): ChunkFetcher<T> {
        return new ChunkFetcher(data);
    }

    reset() {
        this.chunkIndex = 0;
    }

    getPage(page: number): T[] {
        if (page < 0 || page > this.chunks()) {
            return [];
        }
        return this._data.slice((page - 1) * ChunkFetcher.CHUNK_SIZE, (page) * ChunkFetcher.CHUNK_SIZE);
    }

    all(): T[] {
        return this._data;
    }

    getNext(): T[] {
        if (this.chunkIndex + ChunkFetcher.CHUNK_SIZE >= this._data.length || this._data.length === 0) {
            return [];
        }
        const chunk = this._data.slice(this.chunkIndex, this.chunkIndex + ChunkFetcher.CHUNK_SIZE);
        this.chunkIndex += ChunkFetcher.CHUNK_SIZE;
        return chunk;
    }

    chunks(): number {
        return Math.ceil(this._data.length / ChunkFetcher.CHUNK_SIZE);
    }
}