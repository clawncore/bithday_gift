// Simple test to verify server can start without errors
import { createServer } from 'http';
import { parse } from 'url';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Mock the storage to avoid initialization issues
const mockStorage = {
  getToken: async () => undefined,
  createToken: async () => 'test-token',
  markTokenUsed: async () => {},
  saveReply: async () => {}
};

// Mock the shared schema
const mockSchema = {
  replySchema: {
    safeParse: () => ({ success: true, data: { choice: 'yes', message: 'test' } })
  }
};

// Replace modules with mocks
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function(...args) {
  const moduleName = args[0];
  if (moduleName === './storage') {
    return { storage: mockStorage };
  }
  if (moduleName === '@shared/schema') {
    return mockSchema;
  }
  return originalRequire.apply(this, args);
};

try {
  // Test importing the server
  console.log('Testing server import...');
  const { default: serverModule } = await import('./server/index.ts');
  console.log('Server imported successfully');
  process.exit(0);
} catch (error) {
  console.error('Server import failed:', error.message);
  process.exit(1);
}