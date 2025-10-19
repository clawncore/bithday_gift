#!/bin/bash

echo "Birthday Gift - Test Media Changes"
echo "================================="

echo "Building the application..."
npm run build
if [ $? -ne 0 ]; then
    echo "Build failed. Please check the errors above."
    exit 1
fi

echo ""
echo "Build completed successfully!"

echo ""
echo "Starting development server..."
echo "Visit http://localhost:5173/ to view your changes"
npm run dev