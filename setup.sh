#!/bin/bash

# Todo Application Setup Script
# This script sets up and runs both backend and frontend applications

echo "🚀 Todo Application Setup Script"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
print_status "Checking prerequisites..."

# Check Java
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | sed '/^1\./s///' | cut -d'.' -f1)
    if [ "$JAVA_VERSION" -ge 17 ]; then
        print_success "Java $JAVA_VERSION is installed"
    else
        print_error "Java 17 or higher is required. Current version: $JAVA_VERSION"
        exit 1
    fi
else
    print_error "Java is not installed. Please install Java 17 or higher."
    exit 1
fi

# Check Maven
if command -v mvn &> /dev/null; then
    print_success "Maven is installed"
else
    print_warning "Maven not found. Will use Maven wrapper."
fi

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -ge 14 ]; then
        print_success "Node.js $(node -v) is installed"
    else
        print_error "Node.js 14 or higher is required. Current version: $(node -v)"
        exit 1
    fi
else
    print_error "Node.js is not installed. Please install Node.js 14 or higher."
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    print_success "npm $(npm -v) is installed"
else
    print_error "npm is not installed."
    exit 1
fi

echo ""
print_status "All prerequisites are met!"
echo ""

# Setup Backend
print_status "Setting up Spring Boot backend..."
cd todo-backend

if [ ! -f "mvnw" ]; then
    print_warning "Maven wrapper not found. Using system Maven."
    MVN_CMD="mvn"
else
    MVN_CMD="./mvnw"
    chmod +x mvnw
fi

print_status "Building backend application..."
$MVN_CMD clean compile
if [ $? -eq 0 ]; then
    print_success "Backend build successful!"
else
    print_error "Backend build failed!"
    exit 1
fi

cd ..

# Setup Frontend
print_status "Setting up React frontend..."
cd todo-frontend

print_status "Installing frontend dependencies..."
npm install
if [ $? -eq 0 ]; then
    print_success "Frontend dependencies installed!"
else
    print_error "Frontend dependency installation failed!"
    exit 1
fi

cd ..

echo ""
print_success "🎉 Setup completed successfully!"
echo ""
print_status "To start the applications:"
echo ""
print_status "1. Start the backend (in one terminal):"
echo "   cd todo-backend"
if [ -f "todo-backend/mvnw" ]; then
    echo "   ./mvnw spring-boot:run"
else
    echo "   mvn spring-boot:run"
fi
echo ""
print_status "2. Start the frontend (in another terminal):"
echo "   cd todo-frontend"
echo "   npm start"
echo ""
print_status "3. Access the application:"
echo "   Backend API: http://localhost:8080"
echo "   Frontend App: http://localhost:3000"
echo "   H2 Console: http://localhost:8080/h2-console"
echo ""
print_status "Happy coding! 🚀"
