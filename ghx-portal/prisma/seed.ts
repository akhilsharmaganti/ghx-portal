import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // =====================================================================
  // INSERT DEFAULT FORM TEMPLATES
  // =====================================================================
  console.log('📝 Creating form templates...')
  
  const industryMarketTemplate = await prisma.formTemplate.create({
    data: {
      name: 'industry-market',
      description: 'Industry and Market Analysis Form',
      version: 1
    }
  })

  const financialsTemplate = await prisma.formTemplate.create({
    data: {
      name: 'financials',
      description: 'Financial Information Form',
      version: 1
    }
  })

  const clinicalStudiesTemplate = await prisma.formTemplate.create({
    data: {
      name: 'clinical-studies',
      description: 'Clinical Studies and Research Form',
      version: 1
    }
  })

  console.log('✅ Form templates created')

  // =====================================================================
  // INSERT FORM SECTIONS FOR INDUSTRY-MARKET TEMPLATE
  // =====================================================================
  console.log('📋 Creating industry-market form sections...')
  
  const industryAnalysisSection = await prisma.formSection.create({
    data: {
      templateId: industryMarketTemplate.id,
      name: 'Industry Analysis',
      description: 'Analysis of target industry and market',
      orderIndex: 1,
      isRequired: true
    }
  })

  const marketResearchSection = await prisma.formSection.create({
    data: {
      templateId: industryMarketTemplate.id,
      name: 'Market Research',
      description: 'Market size, trends, and opportunities',
      orderIndex: 2,
      isRequired: true
    }
  })

  const competitiveLandscapeSection = await prisma.formSection.create({
    data: {
      templateId: industryMarketTemplate.id,
      name: 'Competitive Landscape',
      description: 'Competitor analysis and positioning',
      orderIndex: 3,
      isRequired: true
    }
  })

  // =====================================================================
  // INSERT FORM FIELDS FOR INDUSTRY-MARKET TEMPLATE
  // =====================================================================
  console.log('🔤 Creating industry-market form fields...')
  
  await prisma.formField.createMany({
    data: [
      {
        sectionId: industryAnalysisSection.id,
        name: 'target_industry',
        label: 'Target Industry',
        fieldType: 'text',
        placeholder: 'e.g., Healthcare, FinTech, AI',
        helpText: 'Primary industry your solution targets',
        isRequired: true,
        orderIndex: 1
      },
      {
        sectionId: industryAnalysisSection.id,
        name: 'industry_size',
        label: 'Industry Size',
        fieldType: 'text',
        placeholder: 'e.g., $50B globally',
        helpText: 'Total addressable market size',
        isRequired: true,
        orderIndex: 2
      },
      {
        sectionId: industryAnalysisSection.id,
        name: 'growth_rate',
        label: 'Growth Rate',
        fieldType: 'text',
        placeholder: 'e.g., 15% annually',
        helpText: 'Industry growth rate',
        isRequired: true,
        orderIndex: 3
      },
      {
        sectionId: marketResearchSection.id,
        name: 'market_segment',
        label: 'Target Market Segment',
        fieldType: 'text',
        placeholder: 'e.g., Small hospitals, Rural clinics',
        helpText: 'Specific market segment',
        isRequired: true,
        orderIndex: 1
      },
      {
        sectionId: marketResearchSection.id,
        name: 'customer_pain_points',
        label: 'Customer Pain Points',
        fieldType: 'textarea',
        placeholder: 'Describe main problems...',
        helpText: 'Key problems your solution solves',
        isRequired: true,
        orderIndex: 2
      },
      {
        sectionId: competitiveLandscapeSection.id,
        name: 'competitors',
        label: 'Main Competitors',
        fieldType: 'textarea',
        placeholder: 'List competitors...',
        helpText: 'Direct and indirect competitors',
        isRequired: true,
        orderIndex: 1
      },
      {
        sectionId: competitiveLandscapeSection.id,
        name: 'competitive_advantage',
        label: 'Competitive Advantage',
        fieldType: 'textarea',
        placeholder: 'Your unique value...',
        helpText: 'What makes you different',
        isRequired: true,
        orderIndex: 2
      }
    ]
  })

  // =====================================================================
  // INSERT FORM SECTIONS FOR FINANCIALS TEMPLATE
  // =====================================================================
  console.log('📋 Creating financials form sections...')
  
  const financialOverviewSection = await prisma.formSection.create({
    data: {
      templateId: financialsTemplate.id,
      name: 'Financial Overview',
      description: 'Basic financial information',
      orderIndex: 1,
      isRequired: true
    }
  })

  const fundingRequirementsSection = await prisma.formSection.create({
    data: {
      templateId: financialsTemplate.id,
      name: 'Funding Requirements',
      description: 'Funding needs and use of funds',
      orderIndex: 2,
      isRequired: true
    }
  })

  const revenueModelSection = await prisma.formSection.create({
    data: {
      templateId: financialsTemplate.id,
      name: 'Revenue Model',
      description: 'Revenue streams and pricing',
      orderIndex: 3,
      isRequired: true
    }
  })

  // =====================================================================
  // INSERT FORM FIELDS FOR FINANCIALS TEMPLATE
  // =====================================================================
  console.log('🔤 Creating financials form fields...')
  
  await prisma.formField.createMany({
    data: [
      {
        sectionId: financialOverviewSection.id,
        name: 'current_funding',
        label: 'Current Funding',
        fieldType: 'text',
        placeholder: 'e.g., $100K',
        helpText: 'Total funding raised to date',
        isRequired: true,
        orderIndex: 1
      },
      {
        sectionId: financialOverviewSection.id,
        name: 'burn_rate',
        label: 'Monthly Burn Rate',
        fieldType: 'text',
        placeholder: 'e.g., $15K/month',
        helpText: 'Monthly cash burn rate',
        isRequired: true,
        orderIndex: 2
      },
      {
        sectionId: financialOverviewSection.id,
        name: 'runway_months',
        label: 'Runway (Months)',
        fieldType: 'text',
        placeholder: 'e.g., 8 months',
        helpText: 'How long until you need funding',
        isRequired: true,
        orderIndex: 3
      },
      {
        sectionId: fundingRequirementsSection.id,
        name: 'funding_needed',
        label: 'Funding Needed',
        fieldType: 'text',
        placeholder: 'e.g., $500K',
        helpText: 'Amount of funding you are seeking',
        isRequired: true,
        orderIndex: 1
      },
      {
        sectionId: fundingRequirementsSection.id,
        name: 'use_of_funds',
        label: 'Use of Funds',
        fieldType: 'textarea',
        placeholder: 'Describe how you will use the funds...',
        helpText: 'Breakdown of fund allocation',
        isRequired: true,
        orderIndex: 2
      },
      {
        sectionId: revenueModelSection.id,
        name: 'revenue_model',
        label: 'Revenue Model',
        fieldType: 'text',
        placeholder: 'e.g., SaaS subscription',
        helpText: 'How you generate revenue',
        isRequired: true,
        orderIndex: 1
      },
      {
        sectionId: revenueModelSection.id,
        name: 'pricing_strategy',
        label: 'Pricing Strategy',
        fieldType: 'textarea',
        placeholder: 'Describe your pricing...',
        helpText: 'Your pricing approach',
        isRequired: true,
        orderIndex: 2
      }
    ]
  })

  // =====================================================================
  // INSERT FORM SECTIONS FOR CLINICAL STUDIES TEMPLATE
  // =====================================================================
  console.log('📋 Creating clinical-studies form sections...')
  
  const researchOverviewSection = await prisma.formSection.create({
    data: {
      templateId: clinicalStudiesTemplate.id,
      name: 'Research Overview',
      description: 'Clinical research information',
      orderIndex: 1,
      isRequired: true
    }
  })

  const studyDesignSection = await prisma.formSection.create({
    data: {
      templateId: clinicalStudiesTemplate.id,
      name: 'Study Design',
      description: 'Study methodology and design',
      orderIndex: 2,
      isRequired: true
    }
  })

  const regulatoryComplianceSection = await prisma.formSection.create({
    data: {
      templateId: clinicalStudiesTemplate.id,
      name: 'Regulatory Compliance',
      description: 'Regulatory requirements and compliance',
      orderIndex: 3,
      isRequired: true
    }
  })

  // =====================================================================
  // INSERT FORM FIELDS FOR CLINICAL STUDIES TEMPLATE
  // =====================================================================
  console.log('🔤 Creating clinical-studies form fields...')
  
  await prisma.formField.createMany({
    data: [
      {
        sectionId: researchOverviewSection.id,
        name: 'research_area',
        label: 'Research Area',
        fieldType: 'text',
        placeholder: 'e.g., Oncology, Cardiology',
        helpText: 'Primary area of clinical research',
        isRequired: true,
        orderIndex: 1
      },
      {
        sectionId: researchOverviewSection.id,
        name: 'study_phase',
        label: 'Study Phase',
        fieldType: 'select',
        placeholder: 'Select phase...',
        helpText: 'Current phase of clinical study',
        isRequired: true,
        orderIndex: 2
      },
      {
        sectionId: researchOverviewSection.id,
        name: 'participant_count',
        label: 'Participant Count',
        fieldType: 'text',
        placeholder: 'e.g., 100 patients',
        helpText: 'Number of study participants',
        isRequired: true,
        orderIndex: 3
      },
      {
        sectionId: studyDesignSection.id,
        name: 'study_design',
        label: 'Study Design',
        fieldType: 'select',
        placeholder: 'Select design...',
        helpText: 'Type of clinical study design',
        isRequired: true,
        orderIndex: 1
      },
      {
        sectionId: studyDesignSection.id,
        name: 'primary_endpoint',
        label: 'Primary Endpoint',
        fieldType: 'textarea',
        placeholder: 'Describe primary endpoint...',
        helpText: 'Main outcome measure',
        isRequired: true,
        orderIndex: 2
      },
      {
        sectionId: regulatoryComplianceSection.id,
        name: 'regulatory_body',
        label: 'Regulatory Body',
        fieldType: 'text',
        placeholder: 'e.g., FDA, EMA',
        helpText: 'Primary regulatory authority',
        isRequired: true,
        orderIndex: 1
      },
      {
        sectionId: regulatoryComplianceSection.id,
        name: 'compliance_status',
        label: 'Compliance Status',
        fieldType: 'select',
        placeholder: 'Select status...',
        helpText: 'Current regulatory compliance status',
        isRequired: true,
        orderIndex: 2
      }
    ]
  })

  console.log('✅ All form templates, sections, and fields created successfully!')
  console.log('🎯 Database is now ready for profile completion forms!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

