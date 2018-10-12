export class ElasticBuffer {
    public offset = 0;
    private buffer: Buffer;

    constructor(size: number) {
        this.buffer = Buffer.allocUnsafe(size);
    }

    clear() {
        this.offset = 0;
    }

    isEmpty() {
        return this.offset === 0;
    }

    reserve(size: number) {
        let length = this.buffer.length;
        const offset = this.offset;
        const available = length - offset;

        if (available < size) {
            while (available + length < size) length *= 2;
            const buffer = Buffer.allocUnsafe(length * 2);
            this.buffer.copy(buffer, 0, 0, offset);
            this.buffer = buffer;
        }
    }

    getBuffer(size: number) {
        const offset = this.offset;
        this.reserve(size);
        this.offset += size;
        return this.buffer.slice(offset, offset + size);
    }

    slice(start?: number, end?: number) {
        if (typeof end === 'undefined') end = this.offset;
        return this.buffer.slice(start, end)
    }
}
