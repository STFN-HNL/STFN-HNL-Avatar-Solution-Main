#!/usr/bin/env node

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const REQUIRED_ENV_VARS = {
  development: ['HEYGEN_API_KEY'],
  'client-production': ['HEYGEN_API_KEY', 'DEPLOYMENT_ENV'],
  'demo-telecom': ['HEYGEN_API_KEY', 'DEPLOYMENT_ENV'],
  'demo-2': ['HEYGEN_API_KEY', 'DEPLOYMENT_ENV']
};

const OPTIONAL_ENV_VARS = ['OPENAI_API_KEY', 'NEXT_PUBLIC_BASE_API_URL'];

function checkEnvironmentVariables() {
  const currentEnv = process.env.DEPLOYMENT_ENV || 'development';
  const requiredVars = REQUIRED_ENV_VARS[currentEnv] || REQUIRED_ENV_VARS.development;
  
  console.log(`\n🔍 Checking environment variables for: ${currentEnv}\n`);
  
  let allValid = true;
  
  // Check required variables
  console.log('Required variables:');
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    const status = value ? '✅' : '❌';
    console.log(`  ${status} ${varName}: ${value ? '[SET]' : '[MISSING]'}`);
    if (!value) allValid = false;
  });
  
  // Check optional variables
  console.log('\nOptional variables:');
  OPTIONAL_ENV_VARS.forEach(varName => {
    const value = process.env[varName];
    const status = value ? '✅' : '⚠️';
    console.log(`  ${status} ${varName}: ${value ? '[SET]' : '[NOT SET]'}`);
  });
  
  console.log('\n' + '='.repeat(50));
  
  if (allValid) {
    console.log('✅ All required environment variables are set!');
  } else {
    console.log('❌ Some required environment variables are missing!');
    process.exit(1);
  }
}

checkEnvironmentVariables(); 