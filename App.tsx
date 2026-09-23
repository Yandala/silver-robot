import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const colors = {
  ink: '#14213D',
  navy: '#0B1F3A',
  muted: '#718096',
  line: '#E8EDF3',
  paper: '#F7F9FC',
  white: '#FFFFFF',
  orange: '#FF6B35',
  orangeSoft: '#FFF0EA',
  teal: '#18A999',
  tealSoft: '#E7F8F5',
  yellow: '#F4B942',
};

type Tab = 'home' | 'guides' | 'garage' | 'profile';

const symptoms = [
  { icon: '🔋', label: 'Dead battery', color: '#FFF4D9' },
  { icon: '🛞', label: 'Flat tire', color: '#E9F5FF' },
  { icon: '🌡️', label: 'Overheating', color: '#FFE9E3' },
  { icon: '⚠️', label: 'Warning light', color: '#F1EAFE' },
];

const guides = [
  { icon: '🔋', title: 'How to jump-start safely', time: '5 min read', tag: 'Most popular' },
  { icon: '🛞', title: 'Change a flat tire', time: '8 min read', tag: 'Roadside' },
  { icon: '🧴', title: 'Check your fluids', time: '4 min read', tag: 'Maintenance' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [selectedVehicle, setSelectedVehicle] = useState('2021 Toyota Camry');

  const callForHelp = () => {
    Alert.alert(
      'Get roadside help',
      'Share your location with a nearby RoadReady mechanic?',
      [
        { text: 'Not now', style: 'cancel' },
        { text: 'Find help', onPress: () => Alert.alert('Request sent', 'A certified mechanic will contact you shortly.') },
      ],
    );
  };

  const openGuide = (title: string) => Alert.alert(title, 'Step-by-step instructions are ready. Always prioritize your safety and move away from traffic before starting work.');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {tab === 'home' && (
            <>
              <View style={styles.header}>
                <View>
                  <Text style={styles.eyebrow}>GOOD MORNING, JORDAN</Text>
                  <Text style={styles.title}>Keep moving.</Text>
                </View>
                <Pressable style={styles.avatar} onPress={() => setTab('profile')}><Text style={styles.avatarText}>JD</Text></Pressable>
              </View>

              <Pressable style={styles.vehiclePicker} onPress={() => setTab('garage')}>
                <View style={styles.carBadge}><Text style={styles.carIcon}>🚙</Text></View>
                <View style={styles.vehicleCopy}>
                  <Text style={styles.vehicleLabel}>YOUR VEHICLE</Text>
                  <Text style={styles.vehicleName}>{selectedVehicle}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </Pressable>

              <Pressable style={styles.emergencyCard} onPress={callForHelp}>
                <View style={styles.emergencyIcon}><Text style={styles.siren}>✦</Text></View>
                <View style={styles.emergencyCopy}>
                  <Text style={styles.emergencyTitle}>Stuck on the road?</Text>
                  <Text style={styles.emergencySubtitle}>Get help from a certified mechanic</Text>
                </View>
                <Text style={styles.arrowWhite}>›</Text>
              </Pressable>

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>What’s happening?</Text>
                <Pressable onPress={() => setTab('guides')}><Text style={styles.link}>See all</Text></Pressable>
              </View>
              <View style={styles.symptomGrid}>
                {symptoms.map((item) => (
                  <Pressable key={item.label} style={styles.symptom} onPress={() => openGuide(item.label)}>
                    <View style={[styles.symptomIcon, { backgroundColor: item.color }]}><Text style={styles.symptomEmoji}>{item.icon}</Text></View>
                    <Text style={styles.symptomLabel}>{item.label}</Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Quick guides</Text>
                <Pressable onPress={() => setTab('guides')}><Text style={styles.link}>View all</Text></Pressable>
              </View>
              {guides.slice(0, 2).map((guide) => (
                <Pressable key={guide.title} style={styles.guideRow} onPress={() => openGuide(guide.title)}>
                  <View style={styles.guideIcon}><Text style={styles.guideEmoji}>{guide.icon}</Text></View>
                  <View style={styles.guideCopy}><Text style={styles.guideTitle}>{guide.title}</Text><Text style={styles.guideMeta}>{guide.tag}  ·  {guide.time}</Text></View>
                  <Text style={styles.chevron}>›</Text>
                </Pressable>
              ))}

              <View style={styles.safetyTip}>
                <Text style={styles.tipIcon}>💡</Text>
                <View style={styles.tipCopy}><Text style={styles.tipTitle}>Safety first</Text><Text style={styles.tipText}>Pull over somewhere safe and turn on your hazard lights.</Text></View>
              </View>
            </>
          )}

          {tab === 'guides' && <Guides onOpen={openGuide} />}
          {tab === 'garage' && <Garage selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} />}
          {tab === 'profile' && <Profile onHelp={callForHelp} />}
        </ScrollView>

        <View style={styles.tabBar}>
          <TabButton icon="⌂" label="Home" active={tab === 'home'} onPress={() => setTab('home')} />
          <TabButton icon="▣" label="Guides" active={tab === 'guides'} onPress={() => setTab('guides')} />
          <TabButton icon="▱" label="My garage" active={tab === 'garage'} onPress={() => setTab('garage')} />
          <TabButton icon="●" label="Profile" active={tab === 'profile'} onPress={() => setTab('profile')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function TabButton({ icon, label, active, onPress }: { icon: string; label: string; active: boolean; onPress: () => void }) {
  return <Pressable style={styles.tab} onPress={onPress}><Text style={[styles.tabIcon, active && styles.tabIconActive]}>{icon}</Text><Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text></Pressable>;
}

function Guides({ onOpen }: { onOpen: (title: string) => void }) {
  return <><View style={styles.pageHeader}><Text style={styles.eyebrow}>LEARN & FIX</Text><Text style={styles.pageTitle}>Repair guides</Text><Text style={styles.pageSubtitle}>Clear steps for the moments you need them most.</Text></View><View style={styles.searchMock}><Text style={styles.searchIcon}>⌕</Text><Text style={styles.searchText}>Search symptoms or repairs</Text></View><Text style={styles.sectionTitle}>Popular right now</Text>{guides.concat([{ icon: '🧰', title: 'Build an emergency kit', time: '6 min read', tag: 'Preparedness' }]).map((guide) => <Pressable key={guide.title} style={styles.largeGuide} onPress={() => onOpen(guide.title)}><View style={styles.largeGuideIcon}><Text style={styles.guideEmoji}>{guide.icon}</Text></View><View style={styles.guideCopy}><Text style={styles.guideTitle}>{guide.title}</Text><Text style={styles.guideMeta}>{guide.tag}  ·  {guide.time}</Text></View><Text style={styles.chevron}>›</Text></Pressable>)}</>;
}

function Garage({ selectedVehicle, setSelectedVehicle }: { selectedVehicle: string; setSelectedVehicle: (vehicle: string) => void }) {
  const vehicles = ['2021 Toyota Camry', '2018 Honda CR-V'];
  return <><View style={styles.pageHeader}><Text style={styles.eyebrow}>YOUR VEHICLES</Text><Text style={styles.pageTitle}>My garage</Text><Text style={styles.pageSubtitle}>Keep your vehicle details and maintenance in one place.</Text></View>{vehicles.map((vehicle, index) => <Pressable key={vehicle} style={[styles.garageCard, selectedVehicle === vehicle && styles.garageCardActive]} onPress={() => setSelectedVehicle(vehicle)}><Text style={styles.garageCar}>{index === 0 ? '🚙' : '🚗'}</Text><View style={styles.vehicleCopy}><Text style={styles.vehicleName}>{vehicle}</Text><Text style={styles.guideMeta}>{selectedVehicle === vehicle ? 'Selected vehicle' : 'Tap to select'}</Text></View>{selectedVehicle === vehicle && <Text style={styles.check}>✓</Text>}</Pressable>)}<Pressable style={styles.addButton} onPress={() => Alert.alert('Add a vehicle', 'Vehicle lookup will be available soon.')}><Text style={styles.addButtonText}>＋  Add a vehicle</Text></Pressable></>;
}

function Profile({ onHelp }: { onHelp: () => void }) {
  return <><View style={styles.profileTop}><View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>JD</Text></View><Text style={styles.pageTitle}>Jordan Davis</Text><Text style={styles.pageSubtitle}>RoadReady member since 2024</Text></View>{['Personal details', 'Notifications', 'Safety & privacy', 'Help center'].map((item) => <Pressable key={item} style={styles.settingsRow} onPress={item === 'Help center' ? onHelp : undefined}><Text style={styles.settingsIcon}>{item === 'Notifications' ? '♢' : item === 'Safety & privacy' ? '◈' : '○'}</Text><Text style={styles.settingsText}>{item}</Text><Text style={styles.chevron}>›</Text></Pressable>)}</>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  container: { flex: 1 },
  scroll: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 110 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  eyebrow: { color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 6 },
  title: { color: colors.ink, fontSize: 32, fontWeight: '800', letterSpacing: -1 },
  avatar: { backgroundColor: colors.navy, width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontWeight: '800', fontSize: 14 },
  vehiclePicker: { backgroundColor: colors.white, borderRadius: 16, padding: 13, flexDirection: 'row', alignItems: 'center', marginBottom: 14, borderWidth: 1, borderColor: colors.line },
  carBadge: { backgroundColor: '#EAF3FA', borderRadius: 12, padding: 10 }, carIcon: { fontSize: 21 },
  vehicleCopy: { flex: 1, marginLeft: 12 }, vehicleLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 1, color: colors.muted }, vehicleName: { color: colors.ink, fontSize: 15, fontWeight: '700', marginTop: 3 },
  chevron: { color: colors.muted, fontSize: 27, fontWeight: '300' },
  emergencyCard: { backgroundColor: colors.orange, borderRadius: 19, padding: 18, flexDirection: 'row', alignItems: 'center', marginBottom: 29, shadowColor: colors.orange, shadowOpacity: .22, shadowRadius: 12, shadowOffset: { width: 0, height: 7 }, elevation: 5 },
  emergencyIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.22)', alignItems: 'center', justifyContent: 'center' }, siren: { color: colors.white, fontSize: 25 }, emergencyCopy: { flex: 1, marginLeft: 13 }, emergencyTitle: { color: colors.white, fontSize: 16, fontWeight: '800' }, emergencySubtitle: { color: '#FFE5DB', fontSize: 12, marginTop: 4 }, arrowWhite: { color: colors.white, fontSize: 28 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }, sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: '800', marginBottom: 13 }, link: { color: colors.orange, fontWeight: '800', fontSize: 13 },
  symptomGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 27 }, symptom: { width: (width - 56) / 2, backgroundColor: colors.white, borderRadius: 15, padding: 13, marginBottom: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.line }, symptomIcon: { borderRadius: 11, padding: 8 }, symptomEmoji: { fontSize: 19 }, symptomLabel: { color: colors.ink, fontWeight: '700', fontSize: 13, marginLeft: 9 },
  guideRow: { backgroundColor: colors.white, borderRadius: 15, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: colors.line }, guideIcon: { width: 48, height: 48, borderRadius: 13, backgroundColor: colors.tealSoft, alignItems: 'center', justifyContent: 'center' }, guideEmoji: { fontSize: 23 }, guideCopy: { flex: 1, marginHorizontal: 12 }, guideTitle: { color: colors.ink, fontSize: 14, fontWeight: '750', lineHeight: 19 }, guideMeta: { color: colors.muted, fontSize: 11, marginTop: 5 },
  safetyTip: { backgroundColor: colors.tealSoft, borderRadius: 16, padding: 15, flexDirection: 'row', marginTop: 16 }, tipIcon: { fontSize: 22, marginRight: 10 }, tipCopy: { flex: 1 }, tipTitle: { color: colors.teal, fontWeight: '800', fontSize: 13 }, tipText: { color: '#39766F', fontSize: 12, lineHeight: 18, marginTop: 3 },
  tabBar: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 84, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.line, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 13 }, tab: { alignItems: 'center', width: 80 }, tabIcon: { color: '#A4AFBC', fontSize: 22, height: 28 }, tabIconActive: { color: colors.orange }, tabLabel: { color: '#A4AFBC', fontSize: 10, fontWeight: '700' }, tabLabelActive: { color: colors.orange },
  pageHeader: { marginTop: 12, marginBottom: 25 }, pageTitle: { color: colors.ink, fontSize: 30, fontWeight: '800', letterSpacing: -.7 }, pageSubtitle: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 7 }, searchMock: { backgroundColor: colors.white, borderColor: colors.line, borderWidth: 1, borderRadius: 14, padding: 15, flexDirection: 'row', marginBottom: 27 }, searchIcon: { fontSize: 22, color: colors.muted }, searchText: { color: '#9BA7B5', marginLeft: 9, alignSelf: 'center' }, largeGuide: { backgroundColor: colors.white, borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 11, borderWidth: 1, borderColor: colors.line }, largeGuideIcon: { width: 54, height: 54, borderRadius: 14, backgroundColor: '#FFF4D9', alignItems: 'center', justifyContent: 'center' },
  garageCard: { backgroundColor: colors.white, borderRadius: 17, padding: 17, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.line, marginBottom: 12 }, garageCardActive: { borderColor: colors.orange, borderWidth: 2 }, garageCar: { fontSize: 30 }, check: { backgroundColor: colors.orange, color: colors.white, fontWeight: '800', borderRadius: 20, paddingHorizontal: 7, paddingVertical: 2 }, addButton: { borderColor: colors.orange, borderWidth: 1.5, borderRadius: 14, padding: 15, alignItems: 'center', marginTop: 7 }, addButtonText: { color: colors.orange, fontWeight: '800' },
  profileTop: { alignItems: 'center', marginTop: 15, marginBottom: 32 }, profileAvatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center', marginBottom: 15 }, profileAvatarText: { color: colors.white, fontWeight: '800', fontSize: 24 }, settingsRow: { backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.line, padding: 18, flexDirection: 'row', alignItems: 'center' }, settingsIcon: { fontSize: 20, color: colors.orange, width: 32 }, settingsText: { flex: 1, color: colors.ink, fontWeight: '700', fontSize: 14 },
});
