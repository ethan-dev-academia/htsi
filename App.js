import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, SafeAreaView, Dimensions, StatusBar, LayoutAnimation, Platform, UIManager } from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const { width } = Dimensions.get('window');

// Data for Carousel
const CAROUSEL_IMAGES = [
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
];

// Data for FAQ
const FAQ_DATA = [
  {
    question: "Who is eligible to apply for HTSI?",
    answer: "Students of High Technology High School who are looking to take their research projects or independent ideas to the next level.",
  },
  {
    question: "Is this connected to the Research Class?",
    answer: "Yes. Since Research is a required class at High Tech, HTSI is designed to directly support students in taking those required projects and turning them into real-world reality.",
  },
  {
    question: "What kind of commitment is required?",
    answer: "Selected startups are expected to commit significant time to development, mentorship meetings, and achieving milestones.",
  },
];

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Carousel Auto-scroll effect simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header / Nav */}
        <View style={styles.header}>
          <Text style={styles.logo}>HTSI</Text>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Carousel */}
        <View style={styles.carouselContainer}>
          <Image 
            source={{ uri: CAROUSEL_IMAGES[activeSlide] }} 
            style={styles.carouselImage} 
            resizeMode="cover"
          />
          <View style={styles.overlay}>
            <Text style={styles.heroTitle}>Innovation at{'\n'}High Technology High School</Text>
            <Text style={styles.heroSubtitle}>Where student research meets real-world entrepreneurship.</Text>
          </View>
          <View style={styles.pagination}>
            {CAROUSEL_IMAGES.map((_, index) => (
              <View 
                key={index} 
                style={[styles.dot, index === activeSlide && styles.activeDot]} 
              />
            ))}
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bridging the Gap</Text>
          <Text style={styles.bodyText}>
            In a school full of entrepreneurs, HTSI is the connector.  
            We bridge the gap for engineers and STEM-focused students, taking the ideas developed 
            in the required Research class and bringing them into reality.
          </Text>

          <View style={styles.featureRow}>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🔬</Text>
              <Text style={styles.featureTitle}>Research</Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🤝</Text>
              <Text style={styles.featureTitle}>Community</Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🚀</Text>
              <Text style={styles.featureTitle}>Impact</Text>
            </View>
          </View>
        </View>

        {/* Process Section */}
        <View style={[styles.section, styles.bgLight]}>
          <Text style={styles.sectionTitle}>The Process</Text>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepCircle}><Text style={styles.stepNumber}>1</Text></View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Apply</Text>
              <Text style={styles.stepText}>Submit your research concept.</Text>
            </View>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepCircle}><Text style={styles.stepNumber}>2</Text></View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Interview</Text>
              <Text style={styles.stepText}>Comprehensive interview to vet viability.</Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepCircle}><Text style={styles.stepNumber}>3</Text></View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Incubate</Text>
              <Text style={styles.stepText}>Guidance from mentors to build.</Text>
            </View>
          </View>
        </View>

        {/* Mentors Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mentors</Text>
          <View style={styles.placeholderBox}>
            <Text style={styles.placeholderTitle}>Expert Guidance</Text>
            <Text style={styles.placeholderText}>We connect you with industry leaders and experienced alumni.</Text>
            <Text style={styles.smallText}>(Mentor list coming soon)</Text>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={[styles.section, styles.bgLight]}>
          <Text style={styles.sectionTitle}>FAQ</Text>
          {FAQ_DATA.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              activeOpacity={0.8} 
              onPress={() => toggleFaq(index)} 
              style={styles.faqItem}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Text style={styles.faqIcon}>{expandedFaq === index ? '-' : '+'}</Text>
              </View>
              {expandedFaq === index && (
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Apply Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apply Now</Text>
          
          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>Applications Closed</Text>
            <Text style={styles.statusText}>We are not currently accepting new cohorts.</Text>
          </View>

          <Text style={styles.acceptanceRate}>Current Acceptance Rate: <Text style={{fontWeight: 'bold'}}>[TBD]%</Text></Text>

          <View style={styles.form}>
            <Text style={styles.label}>Project / Idea Name</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter your project name" 
              editable={false}
            />

            <Text style={styles.label}>Short Description</Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Describe your idea..." 
              multiline 
              numberOfLines={4}
              editable={false}
            />

            <TouchableOpacity style={styles.utilButtonDisabled} disabled>
              <Text style={styles.buttonTextDisabled}>Submit Application (Closed)</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 HTSI - High Tech Startup Incubator</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    marginTop: Platform.OS === 'android' ? 25 : 0, 
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d253f',
  },
  navButton: {
    backgroundColor: '#0d253f',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  // Hero
  carouselContainer: {
    height: 400,
    position: 'relative',
    marginTop: Platform.OS === 'android' ? 80 : 60, // approximate header height
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#eee',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginLeft: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  // Sections
  section: {
    padding: 20,
    marginVertical: 10,
  },
  bgLight: {
    backgroundColor: '#f8f9fa',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d253f',
    marginBottom: 15,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  // Features
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  featureCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '30%',
  },
  featureIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  featureTitle: {
    fontWeight: 'bold',
    color: '#0d253f',
    fontSize: 12,
  },
  // Process
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0d253f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
  },
  stepText: {
    color: '#666',
  },
  // Mentors
  placeholderBox: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#666',
  },
  smallText: {
    marginTop: 15,
    fontSize: 12,
    color: '#999',
  },
  // FAQ
  faqItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontWeight: '600',
    fontSize: 16,
    flex: 1,
  },
  faqIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d253f',
    marginLeft: 10,
  },
  faqAnswer: {
    marginTop: 10,
    color: '#555',
    lineHeight: 20,
  },
  // Apply
  statusBox: {
    backgroundColor: '#fee2e2',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#991b1b',
    marginBottom: 20,
  },
  statusTitle: {
    color: '#991b1b',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  statusText: {
    color: '#991b1b',
  },
  acceptanceRate: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#0d253f',
    fontSize: 16,
  },
  form: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    color: '#999',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  utilButtonDisabled: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonTextDisabled: {
    color: '#666',
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#0d253f',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
});
