import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(title: const Text('Avoid Unnecessary Rebuilds')),
        body: const TextInputWidget(),
      ),
    );
  }
}

class TextInputWidget extends StatefulWidget {
  const TextInputWidget({super.key});

  @override
  TextInputWidgetState createState() => TextInputWidgetState();
}

class TextInputWidgetState extends State<TextInputWidget> {
  late TextEditingController _controller;
  final ValueNotifier<String> _textNotifier = ValueNotifier<String>('');

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(); // Initialize controller once
    _controller.addListener(() {
      // update notifier instead of setState to avoid rebuilds on every keypress
      _textNotifier.value = _controller.text;
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _textNotifier.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    print('TextInputWidget rebuilt'); // debug to verify rebuilds
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          TextField(
            controller: _controller,
            decoration: const InputDecoration(
              labelText: 'Enter text',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 16),
          ValueListenableBuilder<String>(
            valueListenable: _textNotifier,
            builder: (context, value, child) {
              return Text('Current input: $value');
            },
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              // trigger rebuild only on explicit action
              setState(() {
                _textNotifier.value = _controller.text;
              });
            },
            child: const Text('Submit'),
          ),
        ],
      ),
    );
  }
}
